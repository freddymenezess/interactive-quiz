import express from 'express';
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

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

app.use('/auth', authRoutes);

app.use(authenticate);
app.use(authLimiter);

app.use('/admin', adminRoutes);
app.use('/quiz', quizRoutes);
app.use('/session', sessionRoutes);
app.use('/ranking', rankingRoutes);

export default app;
