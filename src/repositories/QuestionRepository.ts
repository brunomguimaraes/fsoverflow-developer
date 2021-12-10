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

  public findUnanswered = async (): Promise<QuestionDB[]> => {
    const result = await connection.query(`
      SELECT 
      id, question, student, class, "submitedAt"
      FROM questions 
      WHERE answered = false;
      `);

    return result.rows;
  };
}

export default QuestionRepository;
