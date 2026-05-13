import { Outlet } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";
import BottomNav from "../components/ui/BottomNav";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#F2EDE4] md:flex">
      <Sidebar />
      <main className="flex-1 md:ml-64 pb-24 md:pb-0">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
