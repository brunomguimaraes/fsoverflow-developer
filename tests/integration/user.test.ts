import supertest from 'supertest';
import app from '../../src/app';
import connection from '../../src/database/connection';
import { httpStatus } from '../../src/utils/enums';
import { mockFakeUser, deleteUsers } from '../factories/userFactory';

afterAll(async () => {
  await deleteUsers();
  connection.end();
});

describe('POST /users', () => {
  test('Shold returns 404 for invalid body', async () => {
    const result = await supertest(app).post('/users').send({
      name: mockFakeUser.name,
      currentClass: 12345
    });

    expect(result.status).toEqual(httpStatus.BAD_REQUEST);
  });

  test('Shold returns 200 for user created successfully', async () => {
    const result = await supertest(app).post('/users').send({
      name: mockFakeUser.name,
      currentClass: mockFakeUser.currentClass
    });

    expect(result.status).toEqual(httpStatus.CREATED);
    expect(result.body.data).toHaveProperty('token');
  });
});
