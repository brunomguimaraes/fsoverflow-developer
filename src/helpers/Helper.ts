import { Response } from 'express';
import { httpStatus } from '../utils/enums';

class Helper {
  public static success = (res: Response, data: any) => {
    return res.status(data.code || httpStatus.SUCCESS).send({
      ...data
    });
  };

  public static failed = (res: Response, catchError: any) => {
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
