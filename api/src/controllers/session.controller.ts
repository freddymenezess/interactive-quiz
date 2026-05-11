import type { Request, Response } from 'express';
import * as sessionService from '@services/session.service.js';

export const start = async (req: Request, res: Response) => {
  try {
    const { quizId } = req.body;
    const userId = req.user!.id; // Assume que o middleware de auth já validou o user

    if (!quizId) {
      return res.status(400).json({ 
        error_code: 'QUIZ_ID_REQUIRED' 
      });
    }

    const session = await sessionService.startSession(userId, quizId);
    return res.status(201).json(session);
  } catch (error) {
    return res.status(500).json({ 
      error_code: (error as Error).message 
    });
  }
};

export const submitAnswer = async (req: Request, res: Response) => {
  try {
    const { id: sessionId } = req.params;
    const { questionId, optionId } = req.body;

    if (!questionId || !optionId) {
      return res.status(400).json({ 
        error_code: 'QUESTION_AND_OPTION_REQUIRED' 
      });
    }

    const answer = await sessionService.submitAnswer(sessionId, questionId, optionId);
    return res.status(201).json(answer);
  } catch (error) {
    return res.status(400).json({ 
      error_code: (error as Error).message 
    });
  }
};

export const finish = async (req: Request, res: Response) => {
  try {
    const { id: sessionId } = req.params;

    const score = await sessionService.finishSession(sessionId);
    return res.json(score);
  } catch (error) {
    return res.status(400).json({ 
      error_code: (error as Error).message 
    });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id: sessionId } = req.params;

    const session = await sessionService.getSessionById(sessionId);
    return res.json(session);
  } catch (error) {
    const message = (error as Error).message;
    // Se a mensagem de erro do service indicar que não existe, enviamos 404
    const statusCode = message.toLowerCase().includes('não encontrada') ? 404 : 400;

    return res.status(statusCode).json({ 
      error_code: message 
    });
  }
};