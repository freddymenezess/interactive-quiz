import { api } from '.';

export const sessionService = {
  start: (quizId: string) => api.post('/session', { quizId }),

  answer: (sessionId: string, questionId: string, optionId: string) =>
    api.post(`/session/${sessionId}/answer`, { questionId, optionId }),

  finish: (sessionId: string) => api.post(`/session/${sessionId}/finish`),

  getById: (sessionId: string) => api.get(`/session/${sessionId}`),
};
