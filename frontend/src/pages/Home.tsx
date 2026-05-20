import { useNavigate } from 'react-router-dom';
import { useHomePage } from '@hooks/useHomePage';
import { useAuth } from '@context/AuthContext';
import { Homeheader } from '@components/layout/Homeheader';
import { FeaturedQuizCard } from '@quiz/FeaturedQuizCard';
import { StatCard } from '@components/ui/StatCard';
import { TopPlayers } from '@ranking/TopPlayers';
import { QuizCard } from '@quiz/QuizCard';
import { Layers } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { latestQuiz, stats, topPlayers, quizzes, isLoading } = useHomePage();

  return (
    <div className="mx-auto grid max-w-260 grid-rows-[auto_1fr] gap-6 md:p-4 md:pt-0 lg:grid-cols-[1fr_300px] lg:grid-rows-[auto_1fr]">
      <div className="h-52 rounded-b-2xl bg-white p-4 lg:col-span-2">
        <Homeheader />
      </div>

      <div className="-mt-40 flex flex-col gap-6 p-4">
        <h2 className="text-titulo text-xl font-bold">
          Atualizado recentemente
        </h2>

        {isLoading ? (
          <div className="h-32 animate-pulse rounded-2xl bg-gray-100" />
        ) : latestQuiz ? (
          <FeaturedQuizCard
            quizId={latestQuiz.id}
            category={latestQuiz.category!.name }
            title={latestQuiz.title}
            sharedBy={latestQuiz.creator!.name}
            gender={latestQuiz.creator!.gender}
          />
        ) : (
          <p className="text-traco text-sm">Nenhum quiz disponível.</p>
        )}

        <div className="border-borda -mx-4 flex flex-col gap-4 rounded-2xl border-t-2 bg-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-titulo text-base font-extrabold">Explorar</h2>
            <button
              onClick={() => navigate('/quizzes')}
              className="text-blue-btn text-xs font-bold hover:underline"
            >
              Ver todos
            </button>
          </div>

          {isLoading ? (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="h-20 animate-pulse rounded-2xl bg-gray-100"
                />
              ))}
            </div>
          ) : quizzes.length === 0 ? (
            <p className="text-traco text-sm">Nenhum quiz disponível.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1">
              {quizzes.slice(0, 4).map((q) => (
                <QuizCard
                  key={q.id}
                  icon={<Layers size={28} className="text-botao" />}
                  title={q.title}
                  count={`${q.questions?.length ?? 0} Perguntas`}
                  people={`Categoria: ${q.category?.name ?? '—'}`}
                  avatarColors={['bg-pink-400', 'bg-purple-400', 'bg-blue-400']}
                  onResult={() => navigate(`/quizzes/${q.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="hidden flex-col gap-4 lg:flex">
        <h2 className="text-titulo text-base font-extrabold">
          Atividade recente
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-20 animate-pulse rounded-2xl bg-gray-100"
              />
            ))
          ) : stats ? (
            <>
              <StatCard
                label="Quizzes feitos"
                value={String(stats.quizzesDone)}
              />
              <StatCard label="Posição global" value={`#${stats.position}`} />
              <StatCard label="Taxa de acerto" value={`${stats.accuracy}%`} />
            </>
          ) : null}
        </div>

        {isLoading ? (
          <div className="h-40 animate-pulse rounded-2xl bg-gray-100" />
        ) : (
          <TopPlayers
            players={topPlayers.map((p, i) => ({
              name: p.name,
              score: `${p.totalScore} pts`,
              avatarColor: [
                'bg-pink-400',
                'bg-blue-400',
                'bg-orange-400',
                'bg-green-400',
                'bg-purple-400',
              ][i % 5],
              isMe: p.userId === user?.id,
            }))}
          />
        )}
      </div>
    </div>
  );
}
