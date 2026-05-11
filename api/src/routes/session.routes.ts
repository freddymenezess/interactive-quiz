import { Router } from 'express';
import { start, submitAnswer, finish, getById } from '../controllers/session.controller.js';

const router = Router();

router.post('/', start);
router.post('/:id/answers', submitAnswer);
router.post('/:id/finish', finish);
router.get('/:id', getById);

export default router;
