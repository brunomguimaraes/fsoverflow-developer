import connection from '../database/connection';
import { User, UserDB } from '../types/User';

class UserRepository {
  public create = async (data: User): Promise<UserDB> => {
    const { name, currentClass, token } = data;

    const result = await connection.query(
      'INSERT INTO users (name, class, token) VALUES ($1, $2, $3) RETURNING *',
      [name, currentClass, token]
    );
    return result.rows[0];
  };

  public findByToken = async (token: string): Promise<UserDB> => {
    const result = await connection.query(
      'SELECT * FROM users WHERE token = $1;',
      [token]
    );
    return result.rows[0];
  };

  public delete = async (): Promise<void> => {
    await connection.query('DELETE FROM users;');
  };
}

export default UserRepository;
