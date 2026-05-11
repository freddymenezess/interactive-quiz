import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { authenticate } from '@middlewares/auth.middleware.js';
import { authLimiter } from '@middlewares/rateLimit.middleware.js';
import authRoutes from '@routes/auth.routes.js';
import adminRoutes from '@routes/admin.routes.js';
import quizRoutes from '@routes/quiz.routes.js';

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

app.use('/auth', authRoutes);

app.use(authenticate);
app.use(authLimiter);

app.use('/admin', adminRoutes);
app.use('/quizzes', quizRoutes);

export default app;
