import { Request, Response, Router } from 'express';
import userRouter from './routes/user.routes';

const router = Router();

router.get('/status', (req: Request, res: Response) => {
  res.send({
    message: 'Server is OK!!'
  });
});

router.use('/users', userRouter);

export default router;
