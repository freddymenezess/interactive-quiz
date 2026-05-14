import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizService } from '@api/quiz.service';
import { sessionService } from '@api/session.service';

export function useQuizSession(quizId: string) {
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<any>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // carrega o quiz e cria a sessão
  useEffect(() => {
    async function init() {
      try {
        const quizData = await quizService.getById(quizId);
        console.log('primeira pergunta:', quizData.questions[0]);
        console.log('correctAnswer:', quizData.questions[0]?.correctAnswer);
        setQuiz(quizData);

        const session = await sessionService.start(quizId);
        setSessionId(session.id);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, [quizId]);

  const currentQuestion = quiz?.questions?.[currentIndex];
  const isLastQuestion = currentIndex === (quiz?.questions?.length ?? 0) - 1;

  async function selectOption(optionId: string) {
    if (answered || !sessionId || !currentQuestion) return;
    setSelectedOption(optionId);
    setAnswered(true);

    await sessionService.answer(sessionId, currentQuestion.id, optionId);
  }

  async function next() {
    if (!sessionId) return;
    setIsSubmitting(true);

    try {
      if (isLastQuestion) {
        const score = await sessionService.finish(sessionId);
        navigate(`/session/${sessionId}/result`, {
          state: { score, total: quiz.questions.length },
        });
      } else {
        setCurrentIndex((i) => i + 1);
        setSelectedOption(null);
        setAnswered(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    quiz,
    sessionId,
    currentQuestion,
    currentIndex,
    selectedOption,
    answered,
    isLoading,
    isSubmitting,
    isLastQuestion,
    selectOption,
    next,
  };
}
