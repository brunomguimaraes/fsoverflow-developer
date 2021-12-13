import connection from '../database/connection';
import { Answer, Question, QuestionDB } from '../types/Question';

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

  public findById = async (id: number): Promise<QuestionDB> => {
    const result = await connection.query(
      'SELECT * FROM questions WHERE id = $1',
      [id]
    );

    return result.rows[0];
  };

  public answerQuestion = async (data: Answer): Promise<QuestionDB[]> => {
    const { id, answeredAt, answeredBy, answer } = data;
    const isAnswered = true;
    const result = await connection.query(
      `UPDATE questions 
      SET "answeredAt" = $1, "answeredBy" = $2, answer = $3, answered = $4
      WHERE id = $5;`,
      [answeredAt, answeredBy, answer, isAnswered, id]
    );

    return result.rows;
  };

  public delete = async (): Promise<void> => {
    await connection.query('DELETE FROM questions;');
  };

  public createAnsweredQuestion = async (): Promise<QuestionDB> => {
    const result = await connection.query(
      'INSERT INTO questions (question, student, class, tags, "submitedAt", answered) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
      ['fakeAnswer', 'fakeStudent', 'fakeClass', 'fakeTags', 'fakeDate', true]
    );

    return result.rows[0];
  };
}

export default QuestionRepository;
