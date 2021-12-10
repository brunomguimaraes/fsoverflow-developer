import { httpStatus } from '../utils/enums';
import AppError from '../errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { DefaultErrorResponse } from '../interfaces/Response';

interface ErrorRequestHandlerAPI {
  err: DefaultErrorResponse;
  req: Request;
  res: Response;
  next: NextFunction;
}

const HandleErrors = ({ err, req, res, next }: ErrorRequestHandlerAPI) => {
  const defaultData = {
    status: httpStatus.BAD_REQUEST,
    message: ''
  };

  if (Array.isArray(err)) {
    defaultData.message = err[0].message;
  }

  if (err instanceof AppError) {
    defaultData.status = err.status;
    defaultData.message = err.message;
  }

  res.status(defaultData.status).send({
    message: defaultData.message
  });
};

export default HandleErrors;
