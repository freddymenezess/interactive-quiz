import type { Request, Response } from 'express';
import {
  loginUser,
  registerUser,
  logoutUser,
  getMe,
} from '@services/auth.service.js';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 2 * 24 * 60 * 60 * 1000,
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error_code: 'EMAIL_REQUIRED' });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error_code: 'INVALID_EMAIL_FORMAT' });
    }

    if (!password) {
      return res.status(400).json({ error_code: 'PASSWORD_REQUIRED' });
    }

    const { token, user } = await loginUser(email, password);

    res.cookie('token', token, COOKIE_OPTIONS);

    return res.status(200).json({ user });
  } catch (err: any) {
    if (err?.error_code) {
      return res.status(err.status ?? 400).json({ error_code: err.error_code });
    }
    throw err;
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, gender } = req.body;

    if (!name) return res.status(400).json({ error_code: 'NAME_REQUIRED' });
    if (name.trim().length < 2)
      return res.status(400).json({ error_code: 'NAME_TOO_SHORT' });
    if (!email) return res.status(400).json({ error_code: 'EMAIL_REQUIRED' });
    if (!emailRegex.test(email))
      return res.status(400).json({ error_code: 'INVALID_EMAIL_FORMAT' });
    if (!password)
      return res.status(400).json({ error_code: 'PASSWORD_REQUIRED' });
    if (password.length < 8)
      return res.status(400).json({ error_code: 'PASSWORD_TOO_SHORT' });
    if (!passwordRegex.test(password))
      return res.status(400).json({ error_code: 'PASSWORD_WEAK' });
    if (!gender || !['male', 'female'].includes(gender)) {
      return res.status(400).json({ error_code: 'GENDER_REQUIRED' });
    }

    const result = await registerUser(name, email, password, gender);
    return res.status(201).json(result);
  } catch (err: any) {
    if (err.message === 'EMAIL_ALREADY_EXISTS') {
      return res.status(409).json({ error_code: 'EMAIL_ALREADY_EXISTS' });
    }
    return res.status(500).json({ error_code: 'INTERNAL_SERVER_ERROR' });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    const result = logoutUser();
    res.clearCookie('token', COOKIE_OPTIONS);
    return res.status(200).json(result);
  } catch {
    return res.status(500).json({ error_code: 'LOGOUT_FAILED' });
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    const { id } = (req as any).user;
    const result = await getMe(id);
    return res.status(200).json(result);
  } catch {
    return res.status(404).json({ error_code: 'USER_NOT_FOUND' });
  }
};
