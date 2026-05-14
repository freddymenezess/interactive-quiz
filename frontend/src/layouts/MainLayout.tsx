import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import BottomNav from '../components/layout/BottomNav';

export default function MainLayout() {
  return (
    <div className="bg-fundo min-h-screen w-full items-start justify-center md:flex">
      <Sidebar />
      <main className="flex-1 pb-24 md:ml-56 md:pb-0">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
