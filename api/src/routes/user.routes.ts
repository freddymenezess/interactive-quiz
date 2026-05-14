import { Router } from 'express';
import { myStats } from '@controllers/user.controller.js';

const router = Router();

router.get('/me/stats', myStats);

export default router;
