import type { Request, Response } from 'express';
import { getGlobalRanking, getRankingByQuiz } from '../services/ranking.service.js';

export const getGlobal = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const ranking = await getGlobalRanking(limit);
    
    return res.json(ranking);
  } catch (error) {
    return res.status(500).json({ 
      error_code: (error as Error).message 
    });
  }
};

export const getByQuiz = async (req: Request, res: Response) => {
  try {
    const { quizId } = Array.isArray(req.params) ? req.params[0] : req.params || {};
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    if (!quizId) {
      return res.status(400).json({ 
        error_code: 'QUIZ_ID_REQUIRED' 
      });
    }

    const ranking = await getRankingByQuiz(quizId, limit);
    
    return res.json(ranking);
  } catch (error) {
    const message = (error as Error).message;
    const statusCode = message === 'QUIZ_NOT_FOUND' ? 404 : 500;
    
    return res.status(statusCode).json({ 
      error_code: message 
    });
  }
};