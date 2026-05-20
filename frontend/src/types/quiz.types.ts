
import type { User, Category, Difficulty, Question, Option, CorrectAnswer } from '../types/prisma.types';

export interface QuizWithRelations {
  id: string;
  title: string;
  categoryId: number;
  difficultyId: number;
  createdBy: string;
  active: boolean;
  createdAt: string;

  category?: Category;
  difficulty?: Difficulty;
  creator?: Pick<User, 'name' | 'gender'>;
  questions?: QuestionWithOptions[];
}

export interface QuestionWithOptions extends Question {
  options: Option[];
  correctAnswer?: CorrectAnswer;
}
