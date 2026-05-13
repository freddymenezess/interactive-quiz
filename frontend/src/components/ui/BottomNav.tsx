import { useNavigate, useLocation } from "react-router-dom";
import { Home, LayoutGrid, BarChart2, Users } from "lucide-react";

const items = [
  { label: "Home", path: "/", icon: Home },
  { label: "Quizzes", path: "/quizzes", icon: LayoutGrid },
  { label: "leaderboard", path: "/leaderboard", icon: BarChart2 },
  { label: "Friends", path: "/friends", icon: Users },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-4 left-4 right-4 bg-white rounded-2xl shadow-xl flex justify-around items-center py-3 px-2 z-50 border border-gray-100">
      {items.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        return (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-1 px-3 py-1"
          >
            <div className={`p-2 rounded-xl transition ${isActive ? "bg-[#4D61DE]" : ""}`}>
              <Icon size={20} color={isActive ? "white" : "#9CA3AF"} strokeWidth={2} />
            </div>
            <span className={`text-[10px] font-semibold ${isActive ? "text-[#4D61DE]" : "text-gray-400"}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
