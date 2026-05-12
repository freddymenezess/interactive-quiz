import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import LogoPage from '@pages/LogoPage';

export default function AppLayout() {
  const { user, isLoading } = useAuth();
  if (isLoading) return <LogoPage />;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
