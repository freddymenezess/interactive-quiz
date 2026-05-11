import type { Request, Response } from 'express';
import * as rankingService from '../services/ranking.service.js';

export async function getGlobal(req: Request, res: Response) {
  try {
    const limit = parseInt(req.query.limit as string) || 10;

    const ranking = await rankingService.getGlobalRanking(limit);
    return res.status(200).json(ranking);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}

export async function getByQuiz(req: Request, res: Response) {
  try {
    const { quizId } = Array.isArray(req.params) ? req.params[0] : req.params;
    const limit = parseInt(req.query.limit as string) || 10;

    const ranking = await rankingService.getRankingByQuiz(quizId, limit);
    return res.status(200).json(ranking);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}
