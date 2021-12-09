import { Request, Response, Router } from 'express';

const router = Router();

router.get('/status', (req: Request, res: Response) => {
  res.send({
    message: 'Server is OK!!'
  });
});

export default router;
