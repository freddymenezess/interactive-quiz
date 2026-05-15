import { useNavigate, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, BarChart2, Users } from 'lucide-react';
import { quizService } from '@api/quiz.service';

const items = [
  { label: 'Home', path: '/home', icon: Home },
  { label: 'Quizzes', path: '/quizzes', icon: LayoutGrid },
  { label: 'Ranking', path: '/ranking', icon: BarChart2 },
  { label: 'Jogar', path: null, icon: Users },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePlay = async () => {
    try {
      const quiz: any = await quizService.getRandom();
      navigate(`/quiz/${quiz.id}/play`);
    } catch {
      // sem quizzes disponíveis
    }
  };

  return (
    <nav className="fixed right-4 bottom-0 left-4 z-50 -mx-5 flex items-center justify-around border border-gray-100 bg-white px-2 py-3 shadow-xl md:hidden">
      {items.map((item) => {
        const isActive = item.path ? location.pathname === item.path : false;
        const Icon = item.icon;
        return (
          <button
            key={item.label}
            onClick={() => (item.path ? navigate(item.path) : handlePlay())}
            className="flex flex-col items-center gap-1 hover:cursor-pointer"
          >
            <div
              className={`rounded-4xl px-6 py-2 transition hover:text-white ${isActive ? 'bg-blue-btn' : ''}`}
            >
              <Icon
                size={20}
                color={isActive ? 'white' : '#6d6d6d'}
                strokeWidth={2}
              />
            </div>
            <span
              className={`text-[10px] font-semibold ${isActive ? 'text-traco' : 'text-gray-400'}`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
