import { api } from '.';

export const userService = {
  getMyStats: () => api.get('/user/me/stats'),
};
