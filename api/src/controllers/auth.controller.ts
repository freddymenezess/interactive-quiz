import type { Request, Response } from 'express';
import { loginUser, registerUser } from '@services/auth.service.js';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

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
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 2 * 24 * 60 * 60 * 1000, 
    });

    return res.status(200).json({ user });
  } catch {
    return res.status(401).json({ error_code: 'INVALID_CREDENTIALS' });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(400).json({ error_code: 'NAME_REQUIRED' });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({ error_code: 'NAME_TOO_SHORT' });
    }

    if (!email) {
      return res.status(400).json({ error_code: 'EMAIL_REQUIRED' });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error_code: 'INVALID_EMAIL_FORMAT' });
    }

    if (!password) {
      return res.status(400).json({ error_code: 'PASSWORD_REQUIRED' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error_code: 'PASSWORD_TOO_SHORT' });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error_code: 'PASSWORD_WEAK' });
    }

    const result = await registerUser(name, email, password);
    return res.status(201).json(result);
  } catch {
    // Aqui verificamos se o erro vindo do service já é um código ou algo genérico
    return res.status(400).json({ error_code: 'REGISTRATION_FAILED' });
  }
};