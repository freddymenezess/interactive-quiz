import { useNavigate, useLocation } from "react-router-dom";
import { Home, LayoutGrid, BarChart2, Users } from "lucide-react";

const items = [
  { label: "Home", path: "/", icon: Home },
  { label: "Quizzes", path: "/quizzes", icon: LayoutGrid },
  { label: "Leaderboard", path: "/leaderboard", icon: BarChart2 },
  { label: "Friends", path: "/friends", icon: Users },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 min-h-screen p-6 gap-6 fixed left-0 top-0">
      <div className="text-xl font-extrabold text-[#4D61DE]">QuizApp</div>
      <nav className="flex flex-col gap-1 mt-4">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition text-left ${
                isActive
                  ? "bg-[#4D61DE] text-white"
                  : "text-gray-500 hover:bg-[#F2EDE4] hover:text-[#4D61DE]"
              }`}
            >
              <Icon size={18} color={isActive ? "white" : "#9CA3AF"} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
