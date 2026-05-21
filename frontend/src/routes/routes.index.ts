import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthLayout from '@/layouts/AuthLayout';
import AppLayout from '@/layouts/AppLayout';
import MainLayout from '@/layouts/MainLayout';

import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import OTPVerificationPage from '@/pages/OTPVerificationPage';
import NewPasswordPage from '@/pages/NewPasswordPage';
import PasswordChangedPage from '@/pages/PasswordChangedPage';

import HomePage from '@/pages/HomePage';
import QuizzesPage from '@/pages/QuizzesPage';
import LeaderboardPage from '@/pages/LeaderboardPage';
import FriendsPage from '@/pages/FriendsPage';
import QuizQuestionPage from '@/pages/QuizQuestionPage';
import EnterQuizCodePage from '@/pages/EnterQuizCodePage';

import CreateQuizPage from '@/pages/CreateQuizPage';
import CreateQuizQuestionsPage from '@/pages/CreateQuizQuestionsPage';

import QuizzesFoundPage from '@/pages/QuizzesFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
      { path: '/otp-verification', element: <OTPVerificationPage /> },
      { path: '/new-password', element: <NewPasswordPage /> },
      { path: '/password-changed', element: <PasswordChangedPage /> },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: '/home', element: <HomePage /> },
          { path: '/quizzes', element: <QuizzesPage /> },
          { path: '/leaderboard', element: <LeaderboardPage /> },
          { path: '/friends', element: <FriendsPage /> },
          { path: '/quiz-question', element: <QuizQuestionPage /> },
          { path: '/enter-code', element: <EnterQuizCodePage /> },
          { path: '/quiz-found', element: <QuizzesFoundPage /> },
        ],
      },

      { path: '/create-quiz', element: <CreateQuizPage /> },
      { path: '/create-quiz/questions', element: <CreateQuizQuestionsPage /> },
    ],
  },
]);
          
