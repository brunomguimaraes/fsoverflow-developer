interface Question {
  question: string;
  student: string;
  currentClass: string;
  tags: string;
  submitedAt?: string;
}

interface QuestionDB extends Omit<Question, 'submitedAt'> {
  id: number;
  submitedAt: string;
  answered: boolean;
  answeredAt: string;
  answeredBy: string;
  answer: string;
}

interface Answer {
  id: number;
  answeredAt: string;
  answeredBy: string;
  answer: string;
}

export { Question, QuestionDB, Answer };
