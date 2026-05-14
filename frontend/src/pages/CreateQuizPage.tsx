import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Copy } from 'lucide-react';

const quizCode = 'Q-452-456';

export default function CreateQuizPage() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('What is the h02?');
  const [options, setOptions] = useState([
    'Option One',
    'Option Two',
    'Option Three',
  ]);

  const handleOption = (i: number, val: string) => {
    const updated = [...options];
    updated[i] = val;
    setOptions(updated);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(quizCode);
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-white px-5 py-6">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E8ECF4] bg-white"
          >
            <ChevronLeft size={18} color="#1E232C" />
          </button>
          <h1 className="text-lg font-extrabold text-gray-900">Create Quiz</h1>
        </div>

        {/* Quiz Code */}
        <div className="mb-1 flex items-center justify-between">
          <span className="text-base font-bold text-gray-900">{quizCode}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs font-semibold text-[#4D61DE]"
          >
            <Copy size={14} color="#4D61DE" /> Copy
          </button>
        </div>

        {/* Progress bar */}
        <div className="mb-5 h-1 w-full rounded-full bg-gray-100">
          <div
            className="h-1 rounded-full bg-[#4D61DE]"
            style={{ width: '60%' }}
          />
        </div>

        {/* Question number */}
        <h2 className="mb-4 text-base font-extrabold text-gray-900">
          Question 10
        </h2>

        {/* Quiz Question */}
        <div className="mb-4">
          <label className="mb-1 block text-xs font-semibold text-gray-500">
            Quiz Question
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full rounded-lg border border-[#E8ECF4] px-4 py-3 text-sm text-gray-700 transition outline-none focus:border-[#4D61DE]"
          />
        </div>

        {/* Quiz Options */}
        <div className="mb-8">
          <label className="mb-2 block text-xs font-semibold text-gray-500">
            Quiz Options
          </label>
          <div className="flex flex-col gap-3">
            {options.map((opt, i) => (
              <input
                key={i}
                type="text"
                value={opt}
                onChange={(e) => handleOption(i, e.target.value)}
                className="w-full rounded-lg border border-[#E8ECF4] px-4 py-3 text-sm text-gray-700 transition outline-none focus:border-[#4D61DE]"
              />
            ))}
          </div>
        </div>

        {/* Continue button */}
        <button
          onClick={() => navigate('/quiz-found')}
          className="w-full rounded-xl bg-[#4D61DE] py-4 font-bold text-white transition hover:bg-blue-600"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
