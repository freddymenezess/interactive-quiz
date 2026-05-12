import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthLayout from '@layouts/AuthLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    element: <AuthLayout />,
    children: [{ path: '/login', element: <h1>Login Page</h1> }],
  },
]);
