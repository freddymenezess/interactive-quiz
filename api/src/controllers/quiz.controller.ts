import type { Request, Response } from 'express';
import * as quizService from '@services/quiz.service.js';

export const getAllQuizzes = async (_req: Request, res: Response) => {
  try {
    const quizzes = await quizService.getAllQuizzes();
    res.status(200).json(quizzes);
  } catch {
    res.status(500).json({ message: 'Erro ao buscar quizzes' });
  }
};

export const getQuizById = async (req: Request, res: Response) => {
  try {
    const quizId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    if (!quizId) {
      return res.status(400).json({ message: 'ID do quiz é obrigatório' });
    }

    const quiz = await quizService.getQuizById(quizId);
    res.status(200).json(quiz);
  } catch {
    res.status(404).json({ message: 'Quiz não encontrado' });
  }
};

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const { title, categoryId, difficultyId } = req.body;

    if (!title || !categoryId || !difficultyId) {
      return res
        .status(400)
        .json({ message: 'Todos os campos são obrigatórios' });
    }

    const quiz = await quizService.createQuiz({
      title,
      categoryId,
      difficultyId,
      createdBy: req.user!.id,
    });

    res.status(201).json(quiz);
  } catch {
    res.status(500).json({ message: 'Erro ao criar quiz' });
  }
};

export const startSession = async (req: Request, res: Response) => {
  try {
    const session = await quizService.startSession(req.user!.id, req.params.id);
    res.status(201).json(session);
  } catch {
    res.status(500).json({ message: 'Erro ao iniciar sessão' });
  }
};

export const submitAnswer = async (req: Request, res: Response) => {
  try {
    const { questionId, optionId } = req.body;

    if (!questionId || !optionId) {
      return res
        .status(400)
        .json({ message: 'Todos os campos são obrigatórios' });
    }

    const answer = await quizService.submitAnswer({
      sessionId: req.params.sessionId,
      questionId,
      optionId,
    });

    res.status(201).json(answer);
  } catch {
    res.status(500).json({ message: 'Erro ao submeter resposta' });
  }
};

export const finishSession = async (req: Request, res: Response) => {
  try {
    const result = await quizService.finishSession(
      req.params.sessionId,
      req.user!.id
    );
    res.status(200).json(result);
  } catch {
    res.status(500).json({ message: 'Erro ao terminar sessão' });
  }
};
