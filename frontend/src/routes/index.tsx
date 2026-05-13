import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthLayout from '@/layouts/AuthLayout';
import AppLayout from '@/layouts/AppLayout';
import MainLayout from '@/layouts/MainLayout';

// Auth pages
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import OTPVerificationPage from '@/pages/OTPVerificationPage';
import NewPasswordPage from '@/pages/NewPasswordPage';
import PasswordChangedPage from '@/pages/PasswordChangedPage';

// Main pages
import HomePage from '@/pages/HomePage';
import QuizzesPage from '@/pages/QuizzesPage';
import LeaderboardPage from '@/pages/LeaderboardPage';
import FriendsPage from '@/pages/FriendsPage';
import QuizQuestionPage from '@/pages/QuizQuestionPage';
import EnterQuizCodePage from '@/pages/EnterQuizCodePage';
import AuthLayout from '@layouts/AuthLayout';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';

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
    element: <AuthLayout />,
    children: [{ path: '/login', element: <Login /> }],
  },
  {
    element: <AuthLayout />,
    children: [{ path: '/register', element: <Register /> }],
  },
  {
    element: <AuthLayout />,
    children: [{ path: '/forgot-password', element: <ForgotPassword /> }],
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
        ],
      },
    ],
  },
]);