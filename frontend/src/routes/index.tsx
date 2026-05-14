import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthLayout from '@/layouts/AuthLayout';
import AppLayout from '@/layouts/AppLayout';
import MainLayout from '@/layouts/MainLayout';

import Home from '@/pages/Home';
import QuizzesPage from '@/pages/Quizzes';
import Ranking from '@/pages/Ranking';
import FriendsPage from '@/pages/FriendsPage';
import QuizQuestion from '@/pages/QuizQuestion';
import EnterQuizCodePage from '@/pages/EnterQuizCodePage';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import SessionResult from '@pages/SessionResult';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/forgot-password', element: <ForgotPassword /> },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: '/home', element: <Home /> },
          { path: '/quizzes', element: <QuizzesPage /> },
          { path: '/ranking', element: <Ranking /> },
          { path: '/friends', element: <FriendsPage /> },
          { path: '//quiz/:quizId/play', element: <QuizQuestion /> },
          { path: '/enter-code', element: <EnterQuizCodePage /> },
          {
            path: '/session/:sessionId/result',
            element: <SessionResult />,
          },
        ],
      },
    ],
  },
]);
