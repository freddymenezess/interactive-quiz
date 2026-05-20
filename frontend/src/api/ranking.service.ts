import { api } from '.';
import type { RankingEntry } from '../types/ranking.types'

export const rankingService = {
  getGlobal: (limit = 5) => api.get<RankingEntry[]>(`/ranking/global?limit=${limit}`),
};
