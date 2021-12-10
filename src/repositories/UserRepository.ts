import connection from '../connection/database';
import { User, UserDB } from '../types/User';

class UserRepository {
  public async create(data: User): Promise<UserDB> {
    const { name, currentClass, token } = data;

    const result = await connection.query(
      'INSERT INTO users (name, class, token) VALUES ($1, $2, $3) RETURNING *',
      [name, currentClass, token]
    );
    return result.rows[0];
  }

  public async findByToken(token: string): Promise<UserDB> {
    const result = await connection.query(
      'SELECT * FROM users WHERE token = $1;',
      [token]
    );
    return result.rows[0];
  }
}

export default UserRepository;
