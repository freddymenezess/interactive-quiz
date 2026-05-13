import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';

export default function AuthLayout() {
  const { user, isLoading } = useAuth();
  if (isLoading) return null; // aguarda verificar sessão
  if (user) return <Navigate to="/dashboard" replace />; // já está logado → sai daqui

  return <Outlet />; // não está logado → mostra login/register
}
