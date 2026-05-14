import type { Request, Response } from 'express';
import {
  addQuestion,
  createQuiz,
  getAllQuizzes,
  getQuizById,
  getLatestQuiz,
  getQuizzesByCategory,
  getRandomQuiz,
} from '@services/quiz.service.js';

export const getAll = async (_req: Request, res: Response) => {
  try {
    const quizzes = await getAllQuizzes();
    return res.json(quizzes);
  } catch {
    return res.status(500).json({
      error_code: 'INTERNAL_SERVER_ERROR',
    });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };

    if (!id) {
      return res.status(400).json({ error_code: 'INVALID_QUIZ_ID' });
    }

    const quiz = await getQuizById(id);
    return res.json(quiz);
  } catch {
    return res.status(404).json({
      error_code: 'QUIZ_NOT_FOUND',
    });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { title, categoryId, difficultyId } = req.body;

    if (!title || !categoryId || !difficultyId) {
      return res.status(400).json({ error_code: 'INVALID_QUIZ_DATA' });
    }

    const quiz = await createQuiz({
      title,
      categoryId,
      difficultyId,
      createdBy: req.user!.id,
    });

    return res.status(201).json(quiz);
  } catch {
    return res.status(500).json({
      error_code: 'INTERNAL_SERVER_ERROR',
    });
  }
};

export const addNewQuestion = async (req: Request, res: Response) => {
  try {
    const quizId = req.params.quizId as string;
    const { text, position, options } = req.body;

    if (
      !text ||
      position === undefined ||
      !options ||
      !Array.isArray(options)
    ) {
      return res.status(400).json({ error_code: 'INVALID_QUESTION_DATA' });
    }

    const question = await addQuestion(quizId, text, position, options);

    return res.status(201).json(question);
  } catch {
    return res.status(400).json({ error_code: 'INTERNAL_SERVER_ERROR' });
  }
};

export const latestQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = await getLatestQuiz();
    return res.status(200).json(quiz);
  } catch (err: any) {
    if (err.message === 'QUIZ_NOT_FOUND') {
      return res.status(404).json({ error_code: 'QUIZ_NOT_FOUND' });
    }
    return res.status(500).json({ error_code: 'INTERNAL_SERVER_ERROR' });
  }
};

export const quizzesByCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = Number(req.params.categoryId);
    const quizzes = await getQuizzesByCategory(categoryId);
    return res.status(200).json(quizzes);
  } catch {
    return res.status(500).json({ error_code: 'INTERNAL_SERVER_ERROR' });
  }
};

export const randomQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = await getRandomQuiz();
    return res.status(200).json(quiz);
  } catch (err: any) {
    if (err.message === 'QUIZ_NOT_FOUND') {
      return res.status(404).json({ error_code: 'QUIZ_NOT_FOUND' });
    }
    return res.status(500).json({ error_code: 'INTERNAL_SERVER_ERROR' });
  }
};
