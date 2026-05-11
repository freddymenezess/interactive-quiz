import { Router } from 'express';
import { getByQuiz, getGlobal } from '../controllers/ranking.controller.js';

const router = Router();

router.get('/', getGlobal);
router.get('/quiz/:quizId', getByQuiz);

export default router;
