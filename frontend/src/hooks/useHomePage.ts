import { useState, useEffect } from 'react';
import { quizService } from '@api/quiz.service';
import { userService } from '@api/user.service';
import { rankingService } from '@api/ranking.service';
import { useAuth } from '@context/AuthContext';

import type { QuizWithRelations } from '@/types/quiz.types';
import type { RankingEntry } from '@/types/ranking.types';
import type { UserStats } from '../types/user.types';

export function useHomePage() {
  const { user } = useAuth();
  const [latestQuiz, setLatestQuiz] = useState<QuizWithRelations | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [topPlayers, setTopPlayers] = useState<RankingEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quizzes, setQuizzes] = useState<QuizWithRelations[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const [quiz, userStats, ranking, allQuizzes] = await Promise.all([
          quizService.getLatest(),
          userService.getMyStats(), // certifique-se que userService retorna UserStats
          rankingService.getGlobal(5),
          quizService.getAll(),
        ]);
        setLatestQuiz(quiz);
        setStats(userStats);
        setTopPlayers(ranking);
        setQuizzes(allQuizzes);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return { latestQuiz, stats, topPlayers, quizzes, isLoading, user };
}