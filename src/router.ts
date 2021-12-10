import { Request, Response, Router } from 'express';
import userRouter from './routes/user.routes';
import questionRouter from './routes/question.routes';

const router = Router();

router.get('/status', (_, res: Response) => {
  res.send({
    message: 'Server is OK!!'
  });
});

router.use('/users', userRouter);
router.use('/questions', questionRouter);

export default router;
