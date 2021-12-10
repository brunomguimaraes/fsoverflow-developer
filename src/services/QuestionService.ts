import { Question } from '../types/Question';
import QuestionRepository from '../repositories/QuestionRepository';
import { generateDate } from '../utils/functions';

class QuestionService {
  public create = async ({
    question,
    student,
    currentClass,
    tags
  }: Question) => {
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
}

export default QuestionService;
