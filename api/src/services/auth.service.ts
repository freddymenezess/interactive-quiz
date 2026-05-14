import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '@lib/prisma.js';
import type { LoginResponse } from '@types/user.types';

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  gender: 'male' | 'female'
) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('EMAIL_ALREADY_EXISTS');

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashedPassword,
      gender,
    },
  });

  return { message: 'USER_CREATED_SUCCESSFULLY' };
};

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('INVALID_CREDENTIALS');

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) throw new Error('INVALID_CREDENTIALS');

  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN ?? '2d';

  if (!secret) throw new Error('JWT_SECRET não configurado');

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    secret,
    { expiresIn }
  );

  return { token, user: { id: user.id, name: user.name, role: user.role } };
};

export const logoutUser = () => {
  return { message: 'LOGOUT_SUCCESSFULLY' };
};

export const getMe = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, role: true },
  });

  if (!user) throw new Error('USER_NOT_FOUND');
  return { user };
};
