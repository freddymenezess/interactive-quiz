import { Router } from 'express';
import {
  getAll,
  getById,
  create,
  addNewQuestion,
} from '@controllers/quiz.controller.js';
import { authenticate } from '@middlewares/auth.middleware.js';
import { isAdmin } from '@middlewares/quiz.middleware.js';

const router = Router();

router.get('/', authenticate, getAll);
router.get('/:id', authenticate, getById);

router.post('/', authenticate, isAdmin, create);
router.post('/:quizId/questions', authenticate, isAdmin, addNewQuestion);

export default router;
