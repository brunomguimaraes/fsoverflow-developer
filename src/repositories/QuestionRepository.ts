import connection from '../connection/database';
import { Question, QuestionDB } from '../types/Question';

class QuestionRepository {
  public create = async (data: Question): Promise<QuestionDB> => {
    const { question, student, currentClass, tags, submitedAt } = data;
    const result = await connection.query(
      `INSERT INTO questions (question, student, class, tags, "submitedAt") 
      VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
      [question, student, currentClass, tags, submitedAt]
    );

    return result.rows[0];
  };
}

export default QuestionRepository;
