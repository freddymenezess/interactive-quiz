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
  register: (credentials: {
    name: string;
    email: string;
    password: string;
    gender: 'male' | 'female';
  }) => api.post('/auth/register', credentials),

  login: (credentials: LoginCredentials) =>
    api.post<AuthResponse>('/auth/login', credentials),

  logout: () => api.post('/auth/logout'),

  getMe: () => api.get<AuthResponse>('/auth/me'),
};
