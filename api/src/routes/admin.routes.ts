import { Router } from 'express';
import { getUsers, banUser } from '@controllers/admin.controller.js';
import { authenticate } from '@middlewares/auth.middleware.js';
import { isAdmin } from '@middlewares/admin.middleware.js';

const router = Router();

router.get('/users', authenticate, isAdmin, getUsers);
router.post('/users/:id/ban', authenticate, isAdmin, banUser);

export default router;
