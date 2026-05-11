import { Router } from 'express';
import * as quizController from '@controllers/quiz.controller.js';
import { authenticate } from '@middleware/auth.middleware.js';
import { isAdmin, isSessionOwner } from '@middleware/quiz.middleware.js';

const router = Router();

router.get('/', authenticate, quizController.getAllQuizzes);
router.get('/:id', authenticate, quizController.getQuizById);

router.post('/', authenticate, isAdmin, quizController.createQuiz);

router.post('/:id/sessions', authenticate, quizController.startSession);
router.post(
  '/sessions/:sessionId/answers',
  authenticate,
  isSessionOwner,
  quizController.submitAnswer
);
router.patch(
  '/sessions/:sessionId/finish',
  authenticate,
  isSessionOwner,
  quizController.finishSession
);

export default router;
