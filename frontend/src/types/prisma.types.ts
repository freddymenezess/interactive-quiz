// ── ENUMS ───────────────────────────────────────
export type RoleType = 'admin' | 'user';
export type Gender = 'male' | 'female';

// ── USER ────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: RoleType;
  banned: boolean;
  createdAt: string; // ou Date
  gender: Gender;

  // Relações (opcional)
  quizzesCreated?: Quiz[];
  sessions?: Session[];
  scores?: Score[];
  bansReceived?: BanLog[];
  bansIssued?: BanLog[];
}

// ── CATEGORY ────────────────────────────────────
export interface Category {
  id: number;
  name: string;
  quizzes?: Quiz[];
}

// ── DIFFICULTY ──────────────────────────────────
export interface Difficulty {
  id: number;
  name: string;
  quizzes?: Quiz[];
}

// ── QUIZ ───────────────────────────────────────
export interface Quiz {
  id: string;
  title: string;
  categoryId: number;
  difficultyId: number;
  createdBy: string;
  active: boolean;
  createdAt: string; // ou Date

  // Relações
  category?: Category;
  difficulty?: Difficulty;
  creator?: User;
  questions?: Question[];
  sessions?: Session[];
  scores?: Score[];
}

// ── QUESTION ───────────────────────────────────
export interface Question {
  id: string;
  quizId: string;
  text: string;
  position: number;
  createdAt: string;

  quiz?: Quiz;
  options?: Option[];
  correctAnswer?: CorrectAnswer;
  sessionAnswers?: SessionAnswer[];
}

// ── OPTION ─────────────────────────────────────
export interface Option {
  id: string;
  questionId: string;
  text: string;

  question?: Question;
  correctAnswer?: CorrectAnswer;
  sessionAnswers?: SessionAnswer[];
}

// ── CORRECT ANSWER ─────────────────────────────
export interface CorrectAnswer {
  questionId: string;
  optionId: string;

  question?: Question;
  option?: Option;
}

// ── SESSION ────────────────────────────────────
export interface Session {
  id: string;
  userId: string;
  quizId: string;
  startedAt: string;
  completedAt?: string;

  user?: User;
  quiz?: Quiz;
  answers?: SessionAnswer[];
  score?: Score;
}

// ── SESSION ANSWER ─────────────────────────────
export interface SessionAnswer {
  id: string;
  sessionId: string;
  questionId: string;
  optionId: string;

  session?: Session;
  question?: Question;
  option?: Option;
}

// ── SCORE ──────────────────────────────────────
export interface Score {
  id: string;
  sessionId: string;
  userId: string;
  quizId: string;
  totalScore: number;
  createdAt: string;

  session?: Session;
  user?: User;
  quiz?: Quiz;
}

// ── BAN LOG ────────────────────────────────────
export interface BanLog {
  id: string;
  userId: string;
  adminId: string;
  reason?: string;
  bannedAt: string;

  user?: User;
  admin?: User;
}