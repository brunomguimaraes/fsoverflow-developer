import { Router } from 'express';
import QuestionController from '../controllers/QuestionController';

const questionRouter = Router();

questionRouter.post('/', QuestionController.create);
questionRouter.get('/', QuestionController.findUnanswered);

export default questionRouter;
