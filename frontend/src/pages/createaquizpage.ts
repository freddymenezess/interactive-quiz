import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Copy } from 'lucide-react';
import { quizService } from '@api/quiz.service';
import type { Category, Difficulty } from '@api/quiz.service';
import {
  FormField,
  TextAreaField,
  SelectField,
  ErrorMessage,
  PrimaryButton,
} from '@components/quiz/CreateQuizFormComponents';

export default function CreateQuizPage() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [difficultyId, setDifficultyId] = useState('');
  const [numQuestions, setNumQuestions] = useState('10');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quizCode, setQuizCode] = useState('');

  useEffect(() => {
    async function loadOptions() {
      try {
        const [cats, diffs] = await Promise.all([
          quizService.categories(),
          quizService.difficulties(),
        ]);
        setCategories(cats);
        setDifficulties(diffs);
      } catch {
        setError('Erro ao carregar categorias e dificuldades.');
      }
    }
    loadOptions();
  }, []);

  const handleCopy = () => navigator.clipboard.writeText(quizCode);

  const handleContinue = async () => {
    if (!title.trim() || !categoryId || !difficultyId) {
      setError('Preenche todos os campos obrigatórios.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const quiz = await quizService.create({
        title,
        description,
        categoryId: Number(categoryId),
        difficultyId: Number(difficultyId),
      });

      setQuizCode(quiz.id); // usar o id como código até haver campo dedicado

      navigate('/create-quiz/questions', {
        state: {
          quizId: quiz.id,
          quizCode: quiz.id,
          numQuestions: Number(numQuestions),
        },
      });
    } catch {
      setError('Erro ao criar o quiz. Tenta novamente.');
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

        
        {quizCode && (
          <>
            <div className="flex items-center justify-between mb-1">
              <span className="text-base font-bold text-gray-900">{quizCode}</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs text-[#4D61DE] font-semibold"
              >
                <Copy size={14} color="#4D61DE" /> Copy
              </button>
            </div>
            <div className="w-full h-px bg-[#4D61DE] mb-5" />
          </>
        )}

        <FormField
          label="Enter the name of the Quiz"
          placeholder="Saturday night Quiz"
          value={title}
          onChange={setTitle}
        />
        <TextAreaField
          label="Quiz Descriptions"
          placeholder="Test your knowledge on the recent happenings around the world"
          value={description}
          onChange={setDescription}
        />
        <SelectField
          label="Quiz Type"
          value={categoryId}
          onChange={setCategoryId}
          options={categories.map((c) => ({ label: c.name, value: c.id }))}
        />
        <SelectField
          label="Difficulty"
          value={difficultyId}
          onChange={setDifficultyId}
          options={difficulties.map((d) => ({ label: d.name, value: d.id }))}
        />
        <SelectField
          label="Number of Questions"
          value={numQuestions}
          onChange={setNumQuestions}
          options={[
            { label: '5 Questions', value: '5' },
            { label: '10 Questions', value: '10' },
            { label: '15 Questions', value: '15' },
            { label: '20 Questions', value: '20' },
          ]}
        />

        {error && <ErrorMessage message={error} />}

        <PrimaryButton
          label="Continue"
          onClick={handleContinue}
          loading={loading}
        />

      </div>
    </div>
  );
                      }
                        
