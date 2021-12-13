import AppError from '../../src/errors/AppError';
import QuestionService from '../../src/services/QuestionService';
import QuestionRepository from '../../src/repositories/QuestionRepository';
import UserRepository from '../../src/repositories/UserRepository';
import * as Functions from '../../src/utils/functions';
import {
  fakeId,
  fakeDate,
  mockFakeQuestion,
  mockFakeQuestionAnsweredDB,
  mockFakeQuestionUnansweredDB,
  mockUnansweredQuestionsArray,
  mockFakeAnswer
} from '../factories/questionFactory';
import { mockFakeUser } from '../factories/userFactory';

jest.mock('../../src/repositories/QuestionRepository');
jest.mock('../../src/repositories/UserRepository');

const stu = new QuestionService();
const QuestionRepositoryMock =
  QuestionRepository as jest.Mock<QuestionRepository>;
const UserRepositoryMock = UserRepository as jest.Mock<UserRepository>;

describe('Question Service', () => {
  const { id, token, answer } = mockFakeAnswer;

  test('Create: Should returns a valid new question', async () => {
    jest
      .spyOn(Functions, 'generateDate')
      .mockImplementationOnce(() => fakeDate.toString());

    QuestionRepositoryMock.mockImplementationOnce(() => {
      return {
        create: () => Promise.resolve(mockFakeQuestionUnansweredDB),
        findUnanswered: () => null,
        findById: () => null,
        answerQuestion: () => null
      };
    });

    const result = await stu.create(mockFakeQuestion);

    expect(result).toHaveProperty('id');
    expect(result.answered).toBeFalsy();
  });

  test('Find Unanswered Questions: Should returns a new AppError - No unanswered questions yet', async () => {
    QuestionRepositoryMock.mockImplementationOnce(() => {
      return {
        create: () => null,
        findUnanswered: () => Promise.resolve([]),
        findById: () => null,
        answerQuestion: () => null
      };
    });

    const promise = stu.findUnanswered();
    await expect(promise).rejects.toThrowError(AppError);
  });

  test('Find Unanswered Questions: Should returns an array of unanswered questions', async () => {
    QuestionRepositoryMock.mockImplementationOnce(() => {
      return {
        create: () => null,
        findUnanswered: () => Promise.resolve(mockUnansweredQuestionsArray),
        findById: () => null,
        answerQuestion: () => null
      };
    });

    const result = await stu.findUnanswered();
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].answered).toBeFalsy();
  });

  test('Get Question by id: Should returns a new AppError - Question not found', async () => {
    QuestionRepositoryMock.mockImplementationOnce(() => {
      return {
        create: () => null,
        findUnanswered: () => null,
        findById: () => null,
        answerQuestion: () => null
      };
    });

    const promise = stu.getQuestion(fakeId);
    await expect(promise).rejects.toThrowError(AppError);
  });

  test('Get Question by id: Should returns an unanswered question', async () => {
    QuestionRepositoryMock.mockImplementationOnce(() => {
      return {
        create: () => null,
        findUnanswered: () => null,
        findById: () => Promise.resolve(mockFakeQuestionUnansweredDB),
        answerQuestion: () => null
      };
    });

    const result = await stu.getQuestion(mockFakeQuestionUnansweredDB.id);
    expect(result.answered).toBeFalsy();
    expect(result.answeredAt).toBeUndefined();
  });

  test('Get Question by id: Should returns an answered question', async () => {
    QuestionRepositoryMock.mockImplementationOnce(() => {
      return {
        create: () => null,
        findUnanswered: () => null,
        findById: () => Promise.resolve(mockFakeQuestionAnsweredDB),
        answerQuestion: () => null
      };
    });

    const result = await stu.getQuestion(mockFakeQuestionAnsweredDB.id);
    expect(result.answered).toBeTruthy();
    expect(result.answeredAt.length).toBeGreaterThan(0);
  });

  test('Answer Question: should returns a new AppError - User not found', async () => {
    UserRepositoryMock.mockImplementationOnce(() => {
      return {
        create: () => null,
        findByToken: () => null,
        delete: () => null
      };
    });

    QuestionRepositoryMock.mockImplementationOnce(() => {
      return {
        create: () => null,
        findUnanswered: () => null,
        findById: () => Promise.resolve(mockFakeQuestionAnsweredDB),
        answerQuestion: () => null
      };
    });

    const promise = stu.answerQuestion(id, token, answer);
    await expect(promise).rejects.toThrowError(AppError);
  });

  test('Answer Question: should returns a new AppError - Question not found', async () => {
    QuestionRepositoryMock.mockImplementationOnce(() => {
      return {
        create: () => null,
        findUnanswered: () => null,
        findById: () => null,
        answerQuestion: () => null
      };
    });

    UserRepositoryMock.mockImplementationOnce(() => {
      return {
        create: () => null,
        findByToken: () => Promise.resolve(mockFakeUser),
        delete: () => null
      };
    });

    const promise = stu.answerQuestion(id, token, answer);
    await expect(promise).rejects.toThrowError(AppError);
  });

  test('Answer Question: should returns a new AppError - Question already answered', async () => {
    QuestionRepositoryMock.mockImplementationOnce(() => {
      return {
        create: () => null,
        findUnanswered: () => null,
        findById: () => Promise.resolve(mockFakeQuestionAnsweredDB),
        answerQuestion: () => null
      };
    });

    UserRepositoryMock.mockImplementationOnce(() => {
      return {
        create: () => null,
        findByToken: () => Promise.resolve(mockFakeUser),
        delete: () => null
      };
    });

    const promise = stu.answerQuestion(id, token, answer);
    await expect(promise).rejects.toThrowError(AppError);
  });

  test('Answer Question: should answer the queston', async () => {
    jest
      .spyOn(Functions, 'generateDate')
      .mockImplementationOnce(() => fakeDate.toString());

    QuestionRepositoryMock.mockImplementationOnce(() => {
      return {
        create: () => null,
        findUnanswered: () => null,
        findById: () => Promise.resolve(mockFakeQuestionUnansweredDB),
        answerQuestion: () => null
      };
    });

    UserRepositoryMock.mockImplementationOnce(() => {
      return {
        create: () => null,
        findByToken: () => Promise.resolve(mockFakeUser),
        delete: () => null
      };
    });

    const promise = stu.answerQuestion(id, token, answer);
    expect(promise).resolves;
  });
});
