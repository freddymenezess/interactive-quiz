import { Router } from 'express';
import {
  getAll,
  getById,
  create,
  addNewQuestion,
  latestQuiz,
  quizzesByCategory,
  randomQuiz,
} from '@controllers/quiz.controller.js';
import { isAdmin } from '@middlewares/quiz.middleware.js';

const router = Router();

router.get('/', getAll);
router.get('/latest', latestQuiz);
router.get('/random', randomQuiz);
router.get('/category/:categoryId', quizzesByCategory);
router.get('/:id', getById);

router.post('/', isAdmin, create);
router.post('/:quizId/questions', isAdmin, addNewQuestion);

export default router;
