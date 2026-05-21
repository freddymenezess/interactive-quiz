import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, Share2, Loader2, AlertCircle } from 'lucide-react';
import { quizService } from '@api/quiz.service';
import type { QuizWithRelations } from '../types/quiz.types';
import { QuizFoundBadge } from '@components/quiz/QuizFoundBadge';
import { QuizFoundDetail } from '@components/quiz/QuizFoundDetail';

export default function QuizFoundPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<QuizWithRelations | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    quizService
      .getById(id)
      .then(setQuiz)
      .catch((err: any) => {
        const code = err?.error_code;
        if (code === 'QUIZ_NOT_FOUND' || code === 'INVALID_QUIZ_ID') {
          setError('Quiz não encontrado.');
        } else {
          setError('Ocorreu um erro ao carregar o quiz.');
        }
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleShare = () => {
    if (!quiz) return;

    const shareData = {
      title: quiz.title,
      text: `Junta-te ao meu quiz! Código: ${quiz.id}`,
      url: `${window.location.origin}/quiz-found/${quiz.id}`,
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(shareData.url).catch(() => {});
    }
  };

  const handlePlay = () => {
    if (!quiz) return;
    navigate(`/quiz/${quiz.id}/play`);
  };

  // ── Loading ─────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F2EDE4] px-5">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <Loader2 size={32} className="animate-spin text-[#4D61DE]" />
          <p className="text-sm font-medium">A carregar quiz…</p>
        </div>
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────────
  if (error || !quiz) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F2EDE4] px-5">
        <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-red-500">
            <AlertCircle size={20} />
            <p className="text-sm font-semibold">{error ?? 'Erro desconhecido.'}</p>
          </div>
          <button
            onClick={() => navigate('/enter-code')}
            className="w-full rounded-xl bg-[#4D61DE] py-3 font-bold text-white transition hover:bg-blue-600"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  // ── Dados derivados ──────────────────────────────────────────────────────
  const questionCount = quiz.questions?.length ?? 0;
  const categoryName = quiz.category?.name ?? '—';
  const inviteUrl = `${window.location.origin}/quiz-found/${quiz.id}`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F2EDE4] px-5 py-10">
      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-lg">

        {/* Botão fechar */}
        <button
          onClick={() => navigate(-1)}
          aria-label="Fechar"
          className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition hover:bg-gray-200"
        >
          <X size={16} className="text-gray-600" />
        </button>

        {/* Ilustração topo */}
        <div className="flex items-center justify-center bg-[#F2EDE4] py-8">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-b from-red-700 to-red-900 shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-red-500 to-red-700">
                <span className="text-3xl">⭐</span>
              </div>
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-red-800 px-4 py-1 text-[10px] font-bold text-white">
              Quiz Game
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="px-6 pt-6 pb-6">

          {/* Badges */}
          <div className="mb-4 flex flex-wrap gap-2">
            <QuizFoundBadge label={categoryName} />
            {questionCount > 0 && (
              <QuizFoundBadge label={`${questionCount} perguntas`} />
            )}
          </div>

          {/* Título */}
          <h2 className="mb-5 text-xl font-extrabold text-gray-900">
            {quiz.title}
          </h2>

          {/* Detalhes */}
          <div className="mb-6 flex flex-col gap-3">
            <QuizFoundDetail label="Quiz ID" value={quiz.id} />
            <QuizFoundDetail label="Invite Link" value={inviteUrl} />
          </div>

          {/* Ações */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handlePlay}
              className="w-full rounded-xl bg-[#4D61DE] py-4 font-bold text-white transition hover:bg-blue-600"
            >
              Jogar agora
            </button>
            <button
              onClick={handleShare}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#4D61DE] py-3 font-bold text-[#4D61DE] transition hover:bg-blue-50"
            >
              <Share2 size={18} />
              Partilhar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
