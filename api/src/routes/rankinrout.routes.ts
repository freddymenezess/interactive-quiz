import { Router } from 'express';
import * as rankingController from 'api/src/controllers/rankingctrlo.controller.js';

const router = Router();

router.get('/', rankingController.getGlobal);
router.get('/quiz/:quizId', rankingController.getByQuiz);

export default router;
