import { useState, useEffect } from 'react';
import { rankingService } from '@api/ranking.service';

export function useRanking() {
  const [players, setPlayers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    rankingService
      .getGlobal(10)
      .then(setPlayers)
      .catch(() => setError('Erro ao carregar ranking'))
      .finally(() => setIsLoading(false));
  }, []);

  return { players, isLoading, error };
}
