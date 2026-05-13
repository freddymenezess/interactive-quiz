import type { Request, Response } from 'express';
import {
  startSession,
  submit,
  finishSession,
  getSessionById,
} from '@services/session.service.js';

export const start = async (req: Request, res: Response) => {
  try {
    const { quizId } = req.body;
    const userId = req.user!.id;

    if (!quizId) {
      return res.status(400).json({
        error_code: 'QUIZ_ID_REQUIRED',
      });
    }

    const session = await startSession(userId, quizId);
    return res.status(201).json(session);
  } catch {
    return res.status(500).json({
      error_code: 'INTERNAL_SERVER_ERROR',
    });
  }
};

export const submitAnswer = async (req: Request, res: Response) => {
  try {
    const sessionId = req.params.id as string;
    const { questionId, optionId } = req.body;

    if (!questionId || !optionId) {
      return res.status(400).json({
        error_code: 'QUESTION_AND_OPTION_REQUIRED',
      });
    }

    const answer = await submit(sessionId, questionId, optionId);
    return res.status(201).json(answer);
  } catch {
    return res.status(400).json({
      error_code: 'INTERNAL_SERVER_ERROR',
    });
  }
};

export const finish = async (req: Request, res: Response) => {
  try {
    const sessionId = req.params.id as string;
    const score = await finishSession(sessionId);

    return res.json(score);
  } catch {
    return res.status(400).json({
      error_code: 'SESSION_NOT_FOUND',
    });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const sessionId = req.params.id as string;

    const session = await getSessionById(sessionId);
    return res.json(session);
  } catch {
    return res.status(404).json({
      error_code: 'SESSION_NOT_FOUND',
    });
  }
};
