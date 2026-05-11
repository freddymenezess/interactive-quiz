import { Router } from 'express';
import * as rankingController from '../controllers/ranking.controller.js';

const router = Router();

router.get('/', rankingController.getGlobal);
router.get('/quiz/:quizId', rankingController.getByQuiz);

export default router;
