import { Router } from 'express';
import QuestionController from '../controllers/QuestionController';
import ensureToken from '../middlewares/ensureToken';

const questionRouter = Router();

questionRouter.post('/', QuestionController.create);
questionRouter.get('/', QuestionController.findUnanswered);
questionRouter.post('/:id', ensureToken, QuestionController.answerQuestion);
questionRouter.get('/:id', QuestionController.getQuestion);

export default questionRouter;
