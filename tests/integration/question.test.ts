import supertest from 'supertest';
import app from '../../src/app';
import connection from '../../src/database/connection';
import { httpStatus } from '../../src/utils/enums';
import {
  mockFakeQuestion,
  mockFakeAnswer,
  deleteQuestions,
  mockFakeQuestionUnansweredDB,
  createFakeUnasweredQuestion,
  createFakeAnsweredQuestion
} from '../factories/questionFactory';
import {
  fakeToken,
  mockFakeUser,
  deleteUsers,
  createFakeUser
} from '../factories/userFactory';

afterAll(async () => {
  await deleteQuestions();
  await deleteUsers();
  connection.end();
});

describe('POST /questions', () => {
  test('Shold returns 400 for invalid body', async () => {
    const result = await supertest(app).post('/questions').send({
      question: mockFakeQuestion.question,
      student: '',
      currentClass: '',
      tags: ''
    });

    expect(result.status).toEqual(httpStatus.BAD_REQUEST);
  });

  test('Shold returns 201 for created question successfully', async () => {
    const result = await supertest(app)
      .post('/questions')
      .send(mockFakeQuestion);

    expect(result.status).toEqual(httpStatus.CREATED);
  });
});

describe('GET /questions', () => {
  beforeAll(async () => {
    await deleteQuestions();
  });

  afterEach(async () => {
    await createFakeUnasweredQuestion();
  });

  test('Shold returns 404 no unanswered questions yet', async () => {
    const result = await supertest(app).get('/questions').send();
    expect(result.status).toEqual(httpStatus.NOT_FOUND);
  });

  test('Shold returns 200 and an unanswered question', async () => {
    const result = await supertest(app).get('/questions').send();

    expect(result.status).toEqual(httpStatus.SUCCESS);
    expect(result.body.data.answered).toBeFalsy();
  });
});

describe('GET /questions/:id', () => {
  beforeAll(async () => {
    await deleteQuestions();
  });

  test('Shold returns 404 no unanswered questions yet', async () => {
    const result = await supertest(app)
      .get(`/questions/${mockFakeQuestionUnansweredDB.id}`)
      .send();
    expect(result.status).toEqual(httpStatus.NOT_FOUND);
  });

  test('Shold returns 200 and an unanswered question', async () => {
    const question = await createFakeUnasweredQuestion();
    const result = await supertest(app).get(`/questions/${question.id}`).send();

    expect(result.status).toEqual(httpStatus.SUCCESS);
    expect(result.body.data.answered).toBeFalsy();
  });
});

describe('POST /questions/:id', () => {
  beforeAll(async () => {
    await deleteQuestions();
    await createFakeUser();
  });

  test('Shold returns 404 for user not found', async () => {
    const question = await createFakeUnasweredQuestion();

    const result = await supertest(app)
      .post(`/questions/${question.id}`)
      .send(mockFakeAnswer)
      .set('Authorization', `Bearer invalid_token_`);

    expect(result.status).toEqual(httpStatus.NOT_FOUND);
  });

  test('Shold returns 404 for question not found', async () => {
    const result = await supertest(app)
      .post(`/questions/-4`)
      .send({ answer: mockFakeAnswer.answer })
      .set('Authorization', `Bearer ${fakeToken}`);

    expect(result.status).toEqual(httpStatus.NOT_FOUND);
  });

  test('Shold returns 409 for question already answered', async () => {
    const question = await createFakeAnsweredQuestion();

    const result = await supertest(app)
      .post(`/questions/${question.id}`)
      .send(mockFakeAnswer)
      .set('Authorization', `Bearer ${fakeToken}`);

    expect(result.status).toEqual(httpStatus.CONFLICT);
    expect(result.body.message).toBe('Question already answered');
  });

  test('Shold returns 200 for question answered successfully', async () => {
    const question = await createFakeUnasweredQuestion();

    const result = await supertest(app)
      .post(`/questions/${question.id}`)
      .send({ answer: mockFakeAnswer.answer })
      .set('Authorization', `Bearer ${fakeToken}`);

    expect(result.status).toEqual(httpStatus.SUCCESS);
  });
});
