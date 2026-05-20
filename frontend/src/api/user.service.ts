import { api } from '.';
import type { UserStats } from '../types/user.types';

export const userService = {
  getMyStats: () => api.get<UserStats>('/user/me/stats'),
};
