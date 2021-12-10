import joi from 'joi';
import { RequestHandlerAPI } from '../types/Request';
import Helper from '../helpers/HelperResponse';
import UserService from '../services/UserService';

const createUserValidator = joi.object({
  name: joi.string().min(3).required(),
  currentClass: joi.string().max(2).alphanum().case('upper').required()
});

class UserController {
  public create: RequestHandlerAPI = async (req, res, next) => {
    try {
      const { name, currentClass } = req.body;
      const { error } = createUserValidator.validate({ name, currentClass });
      if (error) {
        return next(error.details);
      }

      const userService = new UserService();
      const user = await userService.create({
        name,
        currentClass
      });

      return Helper.success(res, {
        message: 'User created successfully',
        data: user
      });
    } catch (err) {
      return Helper.failed(res, err);
    }
  };
}

export default new UserController();
