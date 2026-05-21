import { useNavigate } from 'react-router-dom';
import { BarChart2 } from 'lucide-react';
import { useQuizzes } from '@hooks/useQuizzes';
import BottomNav from '@components/layout/BottomNav';
import Sidebar from '@components/layout/Sidebar';

const subjectEmoji: Record<string, string> = {
  Matemática: '📐',
  História: '📜',
  Ciências: '🔬',
  Geografia: '🌍',
  'Conhecimentos Gerais': '🧠',
};

const subjectColor: Record<string, string> = {
  Matemática: 'bg-orange-100',
  História: 'bg-yellow-100',
  Ciências: 'bg-green-100',
  Geografia: 'bg-blue-100',
  'Conhecimentos Gerais': 'bg-purple-100',
};

export default function Quizzes() {
  const navigate = useNavigate();
  const { quizzes, isLoading, error } = useQuizzes();

  return (
    <div className="min-h-screen bg-[#F2EDE4] pb-24 md:flex md:pb-0">
      <Sidebar />

      <main className="mx-auto max-w-lg flex-1 px-5 py-6 md:mx-0 md:ml-64 md:max-w-2xl md:px-10">
        <h1 className="mb-6 text-xl font-extrabold text-gray-900">Quizzes</h1>

        {isLoading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-20 animate-pulse rounded-2xl bg-white/60"
              />
            ))}
          </div>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : quizzes.length === 0 ? (
          <p className="text-sm text-gray-400">Nenhum quiz disponível.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {quizzes.map((q) => {
              const categoryName = q.category?.name ?? '';
              return (
                <div
                  key={q.id}
                  className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4"
                >
                  <div
                    className={`h-12 w-12 ${subjectColor[categoryName] ?? 'bg-gray-100'} flex items-center justify-center rounded-xl text-lg`}
                  >
                    {subjectEmoji[categoryName] ?? '📝'}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">{q.title}</p>
                    <p className="text-xs text-gray-400">
                      {q.questions?.length ?? 0} Perguntas ·{' '}
                      {q.category?.name ?? '—'}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/quiz/${q.id}/play`)}
                    className="flex items-center gap-1 text-xs font-bold text-botao"
                  >
                    <BarChart2 size={14} color="#4D61DE" /> Começar
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <button
          onClick={() => navigate('/create-quiz')}
          className="fixed right-6 bottom-24 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#4D61DE] text-2xl text-white shadow-lg transition hover:bg-blue-600 md:bottom-8"
        >
          +
        </button>
      </main>

      <BottomNav />
    </div>
  );
}
