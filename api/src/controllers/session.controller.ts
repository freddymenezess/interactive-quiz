import { Request, Response } from 'express';
import * as sessionService from '../services/session.service.js';

export async function start(req: Request, res: Response) {
  try {
    const { quizId } = req.body;
    const userId = (req as any).user.id;

    if (!quizId) {
      return res.status(400).json({ error: 'quizId é obrigatório' });
    }

    const session = await sessionService.startSession(userId, quizId);
    return res.status(201).json(session);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

export async function submitAnswer(req: Request, res: Response) {
  try {
    const { id: sessionId } = req.params;
    const { questionId, optionId } = req.body;

    if (!questionId || !optionId) {
      return res.status(400).json({ error: 'questionId e optionId são obrigatórios' });
    }

    const answer = await sessionService.submitAnswer(sessionId, questionId, optionId);
    return res.status(201).json(answer);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}

export async function finish(req: Request, res: Response) {
  try {
    const { id: sessionId } = req.params;

    const score = await sessionService.finishSession(sessionId);
    return res.status(200).json(score);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const { id: sessionId } = req.params;

    const session = await sessionService.getSessionById(sessionId);
    return res.status(200).json(session);
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
}
