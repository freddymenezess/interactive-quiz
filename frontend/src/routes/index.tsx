import { createBrowserRouter, Navigate } from 'react-router-dom';
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
]);
