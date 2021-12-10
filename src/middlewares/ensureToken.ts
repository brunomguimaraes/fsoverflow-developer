import UserRepository from '../repositories/UserRepository';
import { RequestHandlerAPI } from '../types/Request';
import { httpStatus } from '../utils/enums';

const unauthorized = {
  status: httpStatus.UNAUTHORIZED,
  message: 'Invalid token'
};

const ensureToken: RequestHandlerAPI = async (req, _, next) => {
  if (!req.headers.authorization) {
    return next(unauthorized);
  }

  try {
    const token = req.headers.authorization.split(' ')?.[1] ?? '';

    const userReposisitory = new UserRepository();
    const userExists = userReposisitory.findByToken(token);
    if (!userExists) return next(unauthorized);

    req.token = token;
    return next();
  } catch (err) {
    return next(unauthorized);
  }
};

export default ensureToken;
