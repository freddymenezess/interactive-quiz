import { Request, Response } from 'express';
import * as rankingService from '../services/ranking.service.js';

export async function getGlobal(req: Request, res: Response) {
  try {
    const limit = parseInt(req.query.limit as string) || 10;

    const ranking = await rankingService.getGlobalRanking(limit);
    return res.status(200).json(ranking);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getByQuiz(req: Request, res: Response) {
  try {
    const { quizId } = req.params;
    const limit = parseInt(req.query.limit as string) || 10;

    const ranking = await rankingService.getRankingByQuiz(quizId, limit);
    return res.status(200).json(ranking);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
