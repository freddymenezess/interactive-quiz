import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Copy } from 'lucide-react';
import { quizService } from '@api/quiz.service';
import {
  FormField,
  ErrorMessage,
  PrimaryButton,
} from '@components/quiz/CreateQuizFormComponents';


function ProgressBar({ current, total }: { current: number; total: number }) {
  const progress = ((current - 1) / total) * 100;
  return (
    <div className="w-full h-1 bg-gray-100 rounded-full mb-5">
      <div
        className="h-1 bg-[#4D61DE] rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}


interface OptionInputProps {
  index: number;
  value: string;
  isCorrect: boolean;
  onChange: (v: string) => void;
  onSelectCorrect: () => void;
}

function OptionInput({ index, value, isCorrect, onChange, onSelectCorrect }: OptionInputProps) {
  const labels = ['One', 'Two', 'Three', 'Four'];
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={value}
        placeholder={`Option ${labels[index]}`}
        onChange={(e) => onChange(e.target.value)}
        className={`flex-1 border rounded-lg px-4 py-3 text-sm text-gray-700 outline-none transition ${
          isCorrect ? 'border-[#4D61DE] bg-blue-50' : 'border-[#E8ECF4] bg-white'
        } focus:border-[#4D61DE]`}
      />
      <button
        onClick={onSelectCorrect}
        className={`w-6 h-6 rounded-full border-2 flex-shrink-0 transition ${
          isCorrect ? 'border-[#4D61DE] bg-[#4D61DE]' : 'border-gray-300'
        }`}
        title="Marcar como correta"
      />
    </div>
  );
}


export default function CreateQuizQuestionsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { quizId, quizCode, numQuestions } = location.state as {
    quizId: string;
    quizCode: string;
    numQuestions: number;
  };

  const total = numQuestions || 10;

  const [current, setCurrent] = useState(1);
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCopy = () => navigator.clipboard.writeText(quizCode);

  const handleOption = (i: number, val: string) => {
    const updated = [...options];
    updated[i] = val;
    setOptions(updated);
  };

  const handleNext = async () => {
    if (!questionText.trim()) {
      setError('A pergunta não pode estar vazia.');
      return;
    }
    if (options.some((o) => !o.trim())) {
      setError('Preenche todas as opções.');
      return;
    }
    if (correctIndex === null) {
      setError('Seleciona a opção correta.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      await quizService.addQuestion({
        quizId,
        text: questionText,
        position: current,
        options,
        correctOptionIndex: correctIndex,
      });

      if (current < total) {
        setCurrent((prev) => prev + 1);
        setQuestionText('');
        setOptions(['', '', '', '']);
        setCorrectIndex(null);
      } else {
        navigate('/quizzes');
      }
    } catch {
      setError('Erro ao guardar a pergunta. Tenta novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-start justify-center px-5 py-6">
      <div className="w-full max-w-sm">

      
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 bg-white border border-[#E8ECF4] rounded-xl flex items-center justify-center"
          >
            <ChevronLeft size={18} color="#1E232C" />
          </button>
          <h1 className="text-lg font-extrabold text-gray-900">Create Quiz</h1>
        </div>

      
        <div className="flex items-center justify-between mb-1">
          <span className="text-base font-bold text-gray-900">{quizCode}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-[#4D61DE] font-semibold"
          >
            <Copy size={14} color="#4D61DE" /> Copy
          </button>
        </div>

      
        <ProgressBar current={current} total={total} />

        
        <h2 className="text-base font-extrabold text-gray-900 mb-4">
          Question {current}
        </h2>

        
        <FormField
          label="Quiz Question"
          placeholder="What is the h02?"
          value={questionText}
          onChange={setQuestionText}
        />

        {/* Opções */}
        <div className="mb-8">
          <label className="block text-xs font-semibold text-gray-500 mb-2">
            Quiz Options{' '}
            <span className="font-normal text-gray-400">(toca no círculo para marcar a correta)</span>
          </label>
          <div className="flex flex-col gap-3">
            {options.map((opt, i) => (
              <OptionInput
                key={i}
                index={i}
                value={opt}
                isCorrect={correctIndex === i}
                onChange={(v) => handleOption(i, v)}
                onSelectCorrect={() => setCorrectIndex(i)}
              />
            ))}
          </div>
        </div>

        {error && <ErrorMessage message={error} />}

        <PrimaryButton
          label={current < total ? 'Next Question' : 'Finish Quiz'}
          onClick={handleNext}
          loading={loading}
        />

      </div>
    </div>
  );
}
