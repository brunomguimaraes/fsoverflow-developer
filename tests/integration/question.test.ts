import supertest from 'supertest';
import app from '../../src/app';
import connection from '../../src/database/connection';
import { httpStatus } from '../../src/utils/enums';
import {
  mockFakeQuestion,
  deleteQuestions,
  mockFakeQuestionUnansweredDB,
  createFakeUnasweredQuestion
} from '../factories/questionFactory';

afterAll(async () => {
  await deleteQuestions();
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

  afterEach(async () => {
    await createFakeUnasweredQuestion();
  });

  test('Shold returns 404 no unanswered questions yet', async () => {
    const result = await supertest(app)
      .get(`/question/${mockFakeQuestionUnansweredDB.id}`)
      .send();
    expect(result.status).toEqual(httpStatus.NOT_FOUND);
  });

  /* test('Shold returns 200 and an unanswered question', async () => {
    const result = await supertest(app)
      .get(`/question/${mockFakeQuestionUnansweredDB.id}`)
      .send();
    console.log(result.body);
    expect(result.status).toEqual(httpStatus.SUCCESS);
    expect(result.body.data.answered).toBeFalsy();
  }); */
});
