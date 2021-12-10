import { Question, QuestionDB } from '../types/Question';
import QuestionRepository from '../repositories/QuestionRepository';
import { generateDate } from '../utils/functions';
import AppError from '../errors/AppError';

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
      throw new AppError('No unanswered questions yet', 404);

    return questions;
  };
}

export default QuestionService;
