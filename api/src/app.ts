import express, { Router } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import type { Request, Response, NextFunction } from 'express';
import { authenticate } from '@middlewares/auth.middleware.js';
import { authLimiter } from '@middlewares/rateLimit.middleware.js';
import authRoutes from '@routes/auth.routes.js';
import adminRoutes from '@routes/admin.routes.js';
import quizRoutes from '@routes/quiz.routes.js';
import sessionRoutes from '@routes/session.routes.js';
import rankingRoutes from '@routes/ranking.routes.js';
import userRoutes from '@routes/user.routes.js';

const app = express();
const router = Router();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.options('/{*path}', cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

router.use('/auth', authLimiter, authRoutes);

router.use(authenticate);

router.use('/admin', adminRoutes);
router.use('/quiz', quizRoutes);
router.use('/session', sessionRoutes);
router.use('/ranking', rankingRoutes);
router.use('/user', userRoutes);

app.use('/api', router);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
});

export default app;
