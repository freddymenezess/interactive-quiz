import type { Request, Response, NextFunction } from 'express';
import type { UserPayload } from '@types/user.types.js';
import jwt from 'jsonwebtoken';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      error_code: 'AUTH_MISSING_TOKEN' 
    });
  }

  try {
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET!
    ) as UserPayload;

    if (decoded.role !== 'admin') {
      return res.status(403).json({
        error_code: 'FORBIDDEN_ADMIN_ONLY' 
      });
    }

    req.user = decoded;
    
    next();
  } catch {
    return res.status(401).json({
      error_code: 'AUTH_INVALID_TOKEN' 
    });
  }
};