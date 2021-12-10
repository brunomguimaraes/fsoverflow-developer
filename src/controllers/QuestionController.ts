import joi from 'joi';
import Helper from '../helpers/HelperResponse';
import QuestionService from '../services/QuestionService';
import { RequestHandlerAPI } from '../types/Request';

const createQuestionValidator = joi.object({
  question: joi.string().min(3).required(),
  student: joi.string().min(3).required(),
  currentClass: joi.string().max(2).alphanum().case('upper').required(),
  tags: joi.string().min(3).required()
});

class QuestionController {
  public create: RequestHandlerAPI = async (req, res, next) => {
    try {
      const { question, student, currentClass, tags } = req.body;
      const { error } = createQuestionValidator.validate({
        question,
        student,
        currentClass,
        tags
      });
      if (error) return next(error.details);

      const questionService = new QuestionService();
      const newQuestion = await questionService.create({
        question,
        student,
        currentClass,
        tags
      });

      return Helper.success(res, {
        message: 'Question created successfully',
        data: newQuestion.id
      });
    } catch (err) {
      return Helper.failed(res, err);
    }
  };
}

export default new QuestionController();
