import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { quizService } from '@api/quiz.service';

export default function EnterQuizCodePage() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    const trimmed = code.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setError(null);

    try {
      const quiz = await quizService.getById(trimmed);
      navigate(`/quiz-found/${quiz.id}`);
    } catch (err: any) {
      const code = err?.error_code;
      if (code === 'QUIZ_NOT_FOUND' || code === 'INVALID_QUIZ_ID') {
        setError('Nenhum quiz encontrado com este código.');
      } else {
        setError('Ocorreu um erro. Tenta novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F2EDE4] px-5">
      <div className="w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-bold text-gray-800">
          Enter Quiz code
        </h2>

        <input
          type="text"
          placeholder="Enter code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className="mb-2 w-full rounded-lg border border-[#E8ECF4] bg-[#F7F8F9] px-4 py-3 text-sm outline-none transition focus:border-[#4D61DE] disabled:opacity-50"
        />

        {error && (
          <p className="mb-3 text-xs text-red-500">{error}</p>
        )}

        <button
          onClick={handleSearch}
          disabled={isLoading || !code.trim()}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#4D61DE] py-3 font-bold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Search size={16} />
          {isLoading ? 'A pesquisar...' : 'Search Quiz'}
        </button>

        <button
          onClick={() => navigate(-1)}
          disabled={isLoading}
          className="mt-3 w-full text-sm text-gray-400 transition hover:text-gray-600 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
