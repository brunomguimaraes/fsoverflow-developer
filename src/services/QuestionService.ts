import { Question, QuestionDB } from '../types/Question';
import QuestionRepository from '../repositories/QuestionRepository';
import { generateDate } from '../utils/functions';
import AppError from '../errors/AppError';
import UserRepository from '../repositories/UserRepository';
import { httpStatus } from '../utils/enums';

class QuestionService {
  public create = async ({
    question,
    student,
    currentClass,
    tags
  }: Question): Promise<QuestionDB> => {
    const questionRepository = new QuestionRepository();

    const now = generateDate();
    const newQuestion = await questionRepository.create({
      question,
      student,
      currentClass,
      tags,
      submitedAt: now
    });

    return newQuestion;
  };

  public findUnanswered = async (): Promise<QuestionDB[]> => {
    const questionRepository = new QuestionRepository();
    const questions = await questionRepository.findUnanswered();
    if (questions.length === 0)
      throw new AppError('No unanswered questions yet', httpStatus.NOT_FOUND);

    return questions;
  };

  public getQuestion = async (id: number): Promise<QuestionDB> => {
    const questionRepository = new QuestionRepository();
    const questionExists = await questionRepository.findById(id);
    if (!questionExists)
      throw new AppError('Question not found', httpStatus.NOT_FOUND);

    if (!questionExists.answered) {
      delete questionExists.answeredAt;
      delete questionExists.answeredBy;
      delete questionExists.answer;
    }

    return questionExists;
  };

  public answerQuestion = async (
    id: number,
    token: string,
    answer: string
  ): Promise<void> => {
    const userRepository = new UserRepository();
    const questionRepository = new QuestionRepository();

    const userExists = await userRepository.findByToken(token);
    if (!userExists) throw new AppError('User not found', httpStatus.NOT_FOUND);

    const questionExists = await questionRepository.findById(id);
    if (!questionExists)
      throw new AppError('Question not found', httpStatus.NOT_FOUND);
    if (questionExists.answered)
      throw new AppError('Question already answered', httpStatus.CONFLICT);

    const now = generateDate();
    await questionRepository.answerQuestion({
      id: questionExists.id,
      answeredAt: now,
      answeredBy: userExists.name,
      answer
    });
  };
}

export default QuestionService;
