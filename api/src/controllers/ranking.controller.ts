import type { Request, Response } from 'express';
import {
  getGlobalRanking,
  getRankingByQuiz,
} from '@services/ranking.service.js';

export const getGlobal = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const ranking = await getGlobalRanking(limit);

    return res.json(ranking);
  } catch {
    return res.status(500).json({
      error_code: 'INTERNAL_SERVER_ERROR',
    });
  }
};

export const getByQuiz = async (req: Request, res: Response) => {
  try {
    const { quizId } = Array.isArray(req.params)
      ? req.params[0]
      : req.params || {};
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    if (!quizId) {
      return res.status(400).json({
        error_code: 'QUIZ_ID_REQUIRED',
      });
    }

    const ranking = await getRankingByQuiz(quizId, limit);

    return res.json(ranking);
  } catch {
    return res.status(500).json({
      error_code: 'INTERNAL_SERVER_ERROR',
    });
  }
};
