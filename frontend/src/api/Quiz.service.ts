import { api } from '.';

export interface Quiz {
  id: string;
  title: string;
  description: string;
  categoryId: number;
  difficultyId: number;
  questionCount: number;
  duration: string;
  createdBy: string;
  creator: { name: string };
  category: { name: string };
  difficulty: { name: string };
  active: boolean;
  createdAt: string;
}

export interface CreateQuizPayload {
  title: string;
  description: string;
  categoryId: number;
  difficultyId: number;
}

export interface CreateQuestionPayload {
  quizId: string;
  text: string;
  position: number;
  options: string[];
  correctOptionIndex: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface Difficulty {
  id: number;
  name: string;
}

export const quizService = {
  list: () =>
    api.get<{ data: Quiz[] }>('/quiz').then((res) => res.data),

  getById: (id: string) =>
    api.get<{ data: Quiz }>(`/quiz/${id}`).then((res) => res.data),

  getByCode: (code: string) =>
    api.get<{ data: Quiz }>(`/quiz/code/${code}`).then((res) => res.data),

  create: (payload: CreateQuizPayload) =>
    api.post<{ data: Quiz }>('/quiz', payload).then((res) => res.data),

  addQuestion: (payload: CreateQuestionPayload) =>
    api.post<{ data: unknown }>('/quiz/question', payload).then((res) => res.data),

  categories: () =>
    api.get<{ data: Category[] }>('/quiz/categories').then((res) => res.data),

  difficulties: () =>
    api.get<{ data: Difficulty[] }>('/quiz/difficulties').then((res) => res.data),
};
