import { RoleType } from '@prisma/client';

// O que o sistema usa internamente após o login
export interface UserPayload {
  id: string;
  email: string;
  role: RoleType;
}

// O que a API devolve para o Frontend (sem senha!)
export interface UserResponse {
  id: string;
  name: string;
  role: RoleType;
}

// Para a resposta do Login
export interface LoginResponse {
  token: string;
  user: UserResponse;
}
