import { NextFunction, Request, Response } from 'express';
import { DefaultErrorResponse } from './Response';

type ErrorRequestHandlerAPI = (
  err: DefaultErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

type RequestHandlerAPI = (
  req: Request,
  resp: Response,
  next: NextFunction
) => void;

export { ErrorRequestHandlerAPI, RequestHandlerAPI };
