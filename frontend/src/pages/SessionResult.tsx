import { useLocation, useNavigate } from 'react-router-dom';
import { Trophy } from 'lucide-react';

export default function SessionResultPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const score = state?.score;

  if (!score) {
    navigate('/');
    return null;
  }

  const total = state?.total ?? 0; // ← vem do navigate
  const correct = score?.totalScore ?? 0;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F2EDE4] p-5">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
        {/* Ícone */}
        <div className="bg-blue-btn/10 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full">
          <Trophy size={40} className="text-blue-btn" />
        </div>

        <h1 className="mb-1 text-2xl font-extrabold text-gray-900">
          Quiz Concluído!
        </h1>
        <p className="mb-8 text-sm text-gray-400">Aqui está o teu resultado</p>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          <div className="rounded-2xl bg-green-50 p-4">
            <p className="md:text-2xl font-extrabold text-green-600">{correct}</p>
            <p className="text-xs text-gray-400">Certas</p>
          </div>
          <div className="rounded-2xl bg-red-50 p-4">
            <p className="font-extrabold text-red-500 md:text-2xl">
              {total - correct}
            </p>
            <p className="text-xs text-gray-400">Erradas</p>
          </div>
          <div className="rounded-2xl bg-blue-50 p-4">
            <p className="text-blue-btn font-extrabold md:text-2xl">
              {accuracy}%
            </p>
            <p className="text-xs text-gray-400">Precisão</p>
          </div>
        </div>

        {/* Pontuação */}
        <div className="bg-blue-btn/10 mb-8 rounded-2xl py-6">
          <p className="text-blue-btn text-4xl font-extrabold">
            {correct} / {total}
          </p>
          <p className="mt-1 text-sm text-gray-500">Respostas corretas</p>
        </div>

        {/* Botões */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/quizzes')}
            className="bg-blue-btn w-full rounded-xl py-3 font-bold text-white transition hover:bg-blue-600"
          >
            Ver mais quizzes
          </button>
          <button
            onClick={() => navigate('/home')}
            className="w-full rounded-xl border border-gray-200 py-3 font-bold text-gray-600 transition hover:bg-gray-50"
          >
            Ir para o início
          </button>
        </div>
      </div>
    </div>
  );
}
