import { useParams, useNavigate } from 'react-router-dom';
import { useQuizSession } from '@hooks/useQuizSession';

export default function QuizQuestion() {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const {
    quiz,
    currentQuestion,
    currentIndex,
    selectedOption,
    answered,
    isLoading,
    isSubmitting,
    isLastQuestion,
    selectOption,
    next,
  } = useQuizSession(quizId!);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F2EDE4]">
        <p className="text-sm text-gray-400">A carregar quiz...</p>
      </div>
    );
  }

  if (!quiz || !currentQuestion) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F2EDE4]">
        <p className="text-sm text-red-400">Quiz não encontrado.</p>
      </div>
    );
  }

  const total = quiz.questions.length;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F2EDE4] px-5 py-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E8ECF4] bg-white"
          >
            <svg width="8" height="14" viewBox="0 0 10 16" fill="none">
              <path
                d="M8.5 1L1.5 8L8.5 15"
                stroke="#1E232C"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h2 className="text-sm font-bold text-gray-700">{quiz.title}</h2>
          <button
            onClick={() => navigate('/')}
            className="text-xl text-gray-400"
          >
            ✕
          </button>
        </div>

        {/* Categoria + progresso */}
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-[#4D61DE] px-3 py-1 text-xs font-semibold text-white">
            {quiz.category?.name}
          </span>
          <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-600">
            {currentIndex + 1} / {total}
          </span>
        </div>

        {/* Barra de progresso */}
        <div className="mb-6 h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-[#4D61DE] transition-all"
            style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
          />
        </div>

        {/* Pergunta */}
        <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-5">
          <p className="text-base font-bold text-gray-800">
            {currentQuestion.text}
          </p>
        </div>

        {/* Opções */}
        <div className="mb-8 flex flex-col gap-3">
          {currentQuestion.options.map((opt: any) => {
            const isSelected = selectedOption === opt.id;
            const isCorrect =
              answered && opt.id === currentQuestion.correctAnswer?.optionId;
            const isWrong = answered && isSelected && !isCorrect;

            return (
              <button
                key={opt.id}
                onClick={() => selectOption(opt.id)}
                className={`w-full rounded-2xl border p-4 text-left text-sm font-semibold transition ${
                  !answered
                    ? 'border-gray-100 bg-white hover:border-[#4D61DE] hover:text-[#4D61DE]'
                    : isCorrect
                      ? 'border-green-400 bg-green-50 text-green-700'
                      : isWrong
                        ? 'border-red-400 bg-red-50 text-red-700'
                        : 'border-gray-100 bg-white text-gray-400'
                }`}
              >
                {opt.text}
              </button>
            );
          })}
        </div>

        {/* Botão próxima */}
        {answered && (
          <button
            onClick={next}
            disabled={isSubmitting}
            className="w-full rounded-xl bg-[#4D61DE] py-3 font-bold text-white transition hover:bg-blue-600 disabled:opacity-70"
          >
            {isSubmitting
              ? 'A guardar...'
              : isLastQuestion
                ? 'Terminar'
                : 'Próxima'}
          </button>
        )}
      </div>
    </div>
  );
}
