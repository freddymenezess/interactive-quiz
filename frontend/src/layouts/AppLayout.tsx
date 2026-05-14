import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import LogoPage from '@/pages/Logo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AppLayout() {
  const { user, isLoading } = useAuth();
  if (isLoading) return <LogoPage />;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Outlet />
    </>
  );
}
