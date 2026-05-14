import { api } from '.';

export const quizService = {
  getLatest: () => api.get('/quiz/latest'),
  getAll: () => api.get('/quiz'),
  getByCategory: (categoryId: number) =>
    api.get(`/quiz/category/${categoryId}`),
  getById: (id: string) => api.get(`/quiz/${id}`),
  getRandom: () => api.get('/quiz/random'),
};
