import { useState, useEffect } from 'react';
import { quizService } from '@api/quiz.service';
import { userService } from '@api/user.service';
import { rankingService } from '@api/ranking.service';
import { useAuth } from '@context/AuthContext';

export function useHomePage() {
  const { user } = useAuth();
  const [latestQuiz, setLatestQuiz] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [topPlayers, setTopPlayers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quizzes, setQuizzes] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const [quiz, userStats, ranking, allQuizes] = await Promise.all([
          quizService.getLatest(),
          userService.getMyStats(),
          rankingService.getGlobal(5),
          quizService.getAll(),
        ]);
        setLatestQuiz(quiz);
        setStats(userStats);
        setTopPlayers(ranking);
        setQuizzes(allQuizes);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return { latestQuiz, stats, topPlayers, quizzes, isLoading, user };
}
