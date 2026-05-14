import { Router } from 'express';
import {
  start,
  submitAnswer,
  finish,
  getById,
} from '@controllers/session.controller.js';
import { isSessionOwner } from '@middlewares/session.middleware.js';

const router = Router();

router.get('/:id', getById);
router.post('/', start);
router.post('/:id/answer', isSessionOwner, submitAnswer);
router.post('/:id/finish', isSessionOwner, finish);

export default router;
