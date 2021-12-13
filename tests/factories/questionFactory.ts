import faker from 'faker';
import { Question, QuestionDB } from '../../src/types/Question';
import { mockFakeUser, fakeToken } from './userFactory';

const fakeDate = faker.datatype.datetime();
const fakeId = faker.datatype.number();

const mockFakeQuestion: Question = {
  question: faker.datatype.string(),
  student: faker.name.firstName(),
  currentClass: 'T3',
  tags: faker.datatype.string()
};

const mockFakeQuestionUnansweredDB: QuestionDB = {
  id: fakeId,
  question: faker.datatype.string(),
  student: faker.name.firstName(),
  currentClass: 'T3',
  tags: faker.datatype.string(),
  submitedAt: faker.datatype.string(),
  answered: false,
  answeredAt: null,
  answeredBy: null,
  answer: null
};

const mockFakeQuestionAnsweredDB: QuestionDB = {
  id: fakeId,
  question: faker.datatype.string(),
  student: faker.name.firstName(),
  currentClass: 'T3',
  tags: faker.datatype.string(),
  submitedAt: faker.datatype.string(),
  answered: true,
  answeredAt: faker.datatype.string(),
  answeredBy: faker.datatype.string(),
  answer: faker.datatype.string()
};

const mockUnansweredQuestionsArray = [
  mockFakeQuestionUnansweredDB,
  mockFakeQuestionUnansweredDB
];

const mockFakeAnswer = {
  id: mockFakeUser.id,
  token: fakeToken,
  answer: faker.datatype.string()
};

export {
  fakeId,
  fakeDate,
  mockFakeQuestion,
  mockFakeQuestionAnsweredDB,
  mockFakeQuestionUnansweredDB,
  mockUnansweredQuestionsArray,
  mockFakeAnswer
};
