import { api } from '.';
import type { SessionAnswer, Score } from '../types/prisma.types';

interface SessionWithDetails {
  id: string;
  userId: string;
  quizId: string;
  startedAt: string;
  completedAt?: string;

  answers: SessionAnswer[];
  score?: Score;
  quiz: { title: string };
}

interface SessionResponse {
  id: string;
  userId: string;
  quizId: string;
  startedAt: string;
  completedAt?: string;
}

export const sessionService = {
  start: (quizId: string) => api.post<SessionResponse>('/session', { quizId }),

  answer: (sessionId: string, questionId: string, optionId: string) =>
    api.post(`/session/${sessionId}/answer`, { questionId, optionId }),

  finish: (sessionId: string) => api.post(`/session/${sessionId}/finish`),

  getById: (sessionId: string) => api.get<SessionWithDetails>(`/session/${sessionId}`),
};
