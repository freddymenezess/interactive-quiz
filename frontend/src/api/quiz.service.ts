import { api } from '.';
import type { QuizWithRelations } from '../types/quiz.types';

export const quizService = {
  getLatest: () => api.get<QuizWithRelations>('/quiz/latest'),
  getAll: () => api.get<QuizWithRelations[]>('/quiz'),
  getByCategory: (categoryId: number) =>
    api.get<QuizWithRelations[]>(`/quiz/category/${categoryId}`),
  getById: (id: string) => api.get<QuizWithRelations>(`/quiz/${id}`),
  getRandom: () => api.get<QuizWithRelations>('/quiz/random'),
};
