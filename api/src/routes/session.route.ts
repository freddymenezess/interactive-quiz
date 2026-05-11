import { Router } from 'express';
import * as sessionController from 'api/src/controllers/sessão.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticate);

router.post('/', sessionController.start);
router.post('/:id/answers', sessionController.submitAnswer);
router.post('/:id/finish', sessionController.finish);
router.get('/:id', sessionController.getById);

export default router;
