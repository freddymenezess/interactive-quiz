import { api } from '.';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: string;
    name: string;
    role: 'admin' | 'user';
  };
}

export const authService = {
  register: (credentials: { name: string; email: string; password: string }) =>
    api.post('/auth/register', credentials),
  
  login: (credentials: LoginCredentials) =>
    api.post<AuthResponse>('/auth/login', credentials).then((res) => res.data),

  logout: () => api.post('/auth/logout').then((res) => res.data),

  getMe: () => api.get<AuthResponse>('/auth/me').then((res) => res.data),
};
