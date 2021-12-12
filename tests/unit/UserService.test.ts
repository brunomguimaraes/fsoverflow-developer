import AppError from '../../src/errors/AppError';
import UserService from '../../src/services/UserService';
import UserRepository from '../../src/repositories/UserRepository';
import * as Functions from '../../src/utils/functions';
import { fakeToken, mockFakeUser } from '../factories/userFactory';

jest.mock('../../src/repositories/UserRepository');
jest.mock('../../src/utils/functions');

const stu = new UserService();
const UserRepositoryMock = UserRepository as jest.Mock<UserRepository>;

describe('User Service', () => {
  test('Should returns a new AppError - User already exists', async () => {
    jest
      .spyOn(Functions, 'generateToken')
      .mockImplementationOnce(() => fakeToken);

    UserRepositoryMock.mockImplementationOnce(() => {
      return {
        create: () => null,
        findByToken: () => Promise.resolve(mockFakeUser),
        delete: () => null
      };
    });

    const promise = stu.create({
      name: mockFakeUser.name,
      currentClass: mockFakeUser.currentClass
    });

    await expect(promise).rejects.toThrowError(AppError);
  });

  test('Should returns a valid user', async () => {
    jest
      .spyOn(Functions, 'generateToken')
      .mockImplementationOnce(() => fakeToken);

    UserRepositoryMock.mockImplementationOnce(() => {
      return {
        create: () => Promise.resolve(mockFakeUser),
        findByToken: () => null,
        delete: () => null
      };
    });

    const result = await stu.create({
      name: mockFakeUser.name,
      currentClass: mockFakeUser.currentClass
    });

    expect(result).toHaveProperty('id');
  });
});
