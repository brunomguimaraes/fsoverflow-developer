import { User } from '../interfaces/User';
import UserRepository from '../repositories/UserRepository';

class UserService {
  public async create({ name, currentClass, token }: User) {
    const userReposisitory = new UserRepository();
  }
}

export default UserService;
