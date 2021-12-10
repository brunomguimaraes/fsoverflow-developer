import { Response } from 'express';
import {
  DefaultErrorResponse,
  DefaultSuccessResponse
} from '../types/Response';
import { httpStatus } from '../utils/enums';

class Helper {
  public static success = (res: Response, data: DefaultSuccessResponse) => {
    return res.status(data.status || httpStatus.SUCCESS).send({
      ...data
    });
  };

  public static failed = (res: Response, catchError: DefaultErrorResponse) => {
    const status =
      catchError.status < 1000
        ? catchError.status
        : httpStatus.INTERNAL_SERVER_ERROR;

    return res.status(status).send({
      message: catchError.message
    });
  };
}

export default Helper;
