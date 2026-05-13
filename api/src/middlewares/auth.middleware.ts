import type { Request, Response, NextFunction } from 'express';
import type { UserPayload } from '@types/user.types.js';
import jwt from 'jsonwebtoken';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error_code: 'AUTH_TOKEN_REQUIRED' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded as UserPayload;
    next();
  } catch {
    res.status(401).json({ error_code: 'AUTH_INVALID_TOKEN' });
  }
};
