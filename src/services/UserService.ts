import { User } from '../types/User';
import UserRepository from '../repositories/UserRepository';
import { generateToken } from '../utils/functions';
import AppError from '../errors/AppError';
import { httpStatus } from '../utils/enums';

class UserService {
  public async create({ name, currentClass }: User) {
    const userReposisitory = new UserRepository();

    const token = generateToken();
    const userExists = await userReposisitory.findByToken(token);
    if (userExists)
      throw new AppError('User already exists', httpStatus.CONFLICT);

    const data = {
      name,
      currentClass,
      token
    };
    const user = await userReposisitory.create(data);

    return user;
  }
}

export default UserService;
