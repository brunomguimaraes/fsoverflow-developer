import joi from 'joi';
import HelperResponse from '../helpers/HelperResponse';
import Helper from '../helpers/HelperResponse';
import QuestionService from '../services/QuestionService';
import { RequestHandlerAPI } from '../types/Request';
import { httpStatus } from '../utils/enums';

const createQuestionValidator = joi.object({
  question: joi.string().min(3).required(),
  student: joi.string().min(3).required(),
  currentClass: joi.string().max(2).alphanum().case('upper').required(),
  tags: joi.string().min(3).required()
});

const answerQuestionValidator = joi.object({
  answer: joi.string().min(3).required()
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
        status: httpStatus.CREATED,
        message: 'Question created successfully',
        data: {
          id: newQuestion.id
        }
      });
    } catch (err) {
      return Helper.failed(res, err);
    }
  };

  public findUnanswered: RequestHandlerAPI = async (req, res, next) => {
    try {
      const questionService = new QuestionService();
      const questions = await questionService.findUnanswered();

      return HelperResponse.success(res, {
        message: 'Success',
        data: questions
      });
    } catch (err) {
      return Helper.failed(res, err);
    }
  };

  public getQuestion: RequestHandlerAPI = async (req, res, next) => {
    try {
      const id = Number(req.params.id);

      const questionService = new QuestionService();
      const question = await questionService.getQuestion(id);

      return Helper.success(res, {
        message: 'Success',
        data: question
      });
    } catch (err) {
      return Helper.failed(res, err);
    }
  };

  public answerQuestion: RequestHandlerAPI = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const { answer } = req.body;
      const { token } = req;

      const { error } = answerQuestionValidator.validate({ answer });
      if (error) return next(error.details);

      const questionService = new QuestionService();
      await questionService.answerQuestion(id, token, answer);

      return Helper.success(res, {
        message: 'Question answered successfully',
        data: {}
      });
    } catch (err) {
      return Helper.failed(res, err);
    }
  };
}

export default new QuestionController();
