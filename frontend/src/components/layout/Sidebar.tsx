import { useNavigate, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, BarChart2, Users } from 'lucide-react';

const items = [
  { label: 'Home', path: '/home', icon: Home },
  { label: 'Quizzes', path: '/quizzes', icon: LayoutGrid },
  { label: 'Ranking', path: '/ranking', icon: BarChart2 },
  { label: 'Jogar', path: null, icon: Users },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="fixed top-0 left-0 hidden min-h-screen w-56 flex-col gap-6 border-r border-gray-100 bg-white p-6 md:flex">
      <div className="text-botao text-xl font-extrabold">QuizApp</div>
      <nav className="mt-4 flex flex-col gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                isActive
                  ? 'bg-botao text-white'
                  : 'hover:text-botao text-gray-500 hover:bg-[#F2EDE4]'
              }`}
            >
              <Icon size={18} color={isActive ? 'white' : '#9CA3AF'} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
