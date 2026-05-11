import type { Request, Response } from 'express';
import * as quizService from '@services/quiz.service.js';

export const getAllQuizzes = async (_req: Request, res: Response) => {
  try {
    const quizzes = await quizService.getAllQuizzes();
    res.status(200).json(quizzes);
  } catch {
    res.status(500).json({ error_code: 'INTERNAL_SERVER_ERROR' });
  }
};

export const getQuizById = async (req: Request, res: Response) => {
  try {
    const quizId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    if (!quizId) {
      return res.status(400).json({ error_code: 'INVALID_QUIZ_ID' });
    }

    const quiz = await quizService.getQuizById(quizId);
    res.status(200).json(quiz);
  } catch {
    res.status(404).json({ error_code: 'QUIZ_NOT_FOUND' });
  }
};

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const { title, categoryId, difficultyId } = req.body;

    if (!title || !categoryId || !difficultyId) {
      return res.status(400).json({ error_code: 'INVALID_QUIZ_DATA' });
    }

    const quiz = await quizService.createQuiz({
      title,
      categoryId,
      difficultyId,
      createdBy: req.user!.id,
    });

    res.status(201).json(quiz);
  } catch {
    res.status(500).json({ error_code: 'INTERNAL_SERVER_ERROR' });
  }
};

export const startSession = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    if (!id) {
      return res.status(400).json({ error_code: 'INVALID_SESSION_ID' });
    }
    const session = await quizService.startSession(req.user!.id, id);
    res.status(201).json(session);
  } catch {
    res.status(500).json({ error_code: 'INTERNAL_SERVER_ERROR' });
  }
};

export const submitAnswer = async (req: Request, res: Response) => {
  try {
    const { questionId, optionId } = req.body;

    if (!questionId || !optionId) {
      return res.status(400).json({ error_code: 'INVALID_ANSWER_DATA' });
    }
    const sessionId = Array.isArray(req.params.sessionId)
      ? req.params.sessionId[0]
      : req.params.sessionId;

    if (!sessionId) {
      return res.status(400).json({ error_code: 'INVALID_SESSION_ID' });
    }

    const answer = await quizService.submitAnswer({
      sessionId,
      questionId,
      optionId,
    });

    res.status(201).json(answer);
  } catch {
    res.status(500).json({ error_code: 'INTERNAL_SERVER_ERROR' });
  }
};

export const finishSession = async (req: Request, res: Response) => {
  try {
    const sessionId = Array.isArray(req.params.sessionId)
      ? req.params.sessionId[0]
      : req.params.sessionId;

    if (!sessionId) {
      return res.status(400).json({ error_code: 'INVALID_SESSION_ID' });
    }
    const result = await quizService.finishSession(
      sessionId,
      req.user!.id
    );
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error_code: 'INTERNAL_SERVER_ERROR' });
  }
};
