import { api } from '.';

export const rankingService = {
  getGlobal: (limit = 5) => api.get(`/ranking/global?limit=${limit}`),
};
