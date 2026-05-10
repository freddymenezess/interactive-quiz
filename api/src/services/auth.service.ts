import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '@lib/prisma.js';
import type { LoginResponse } from '@types/user.types';

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('Email já registado');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { name, email, passwordHash: hashedPassword },
  });

  return { message: 'Utilizador criado com sucesso. Faça login para continuar' };
};

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Credenciais inválidas');

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) throw new Error('Credenciais inválidas');

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET as jwt.Secret,
    { expiresIn: process.env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] }
  );

  return { token, user: { id: user.id, name: user.name, role: user.role } };
};
