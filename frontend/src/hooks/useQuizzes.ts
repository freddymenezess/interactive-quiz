import { useState, useEffect } from 'react';
import { quizService } from '@api/quiz.service';

export function useQuizzes() {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    quizService
      .getAll()
      .then(setQuizzes)
      .catch(() => setError('Erro ao carregar quizzes'))
      .finally(() => setIsLoading(false));
  }, []);

  return { quizzes, isLoading, error };
}
