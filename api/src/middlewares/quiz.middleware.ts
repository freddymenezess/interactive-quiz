import type { Request, Response, NextFunction } from 'express';
import prisma from '@lib/prisma.js';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error_code: 'FORBIDDEN' });
  }
  next();
};

export const isSessionOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionId = Array.isArray(req.params.sessionId)
      ? req.params.sessionId[0]
      : req.params.sessionId;

    if (!sessionId) {
      return res.status(400).json({ error_code: 'INVALID_SESSION_ID' });
    }
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
  });

  if (!session) {
    return res.status(404).json({ error_code: 'SESSION_NOT_FOUND' });
  }

  if (session.userId !== req.user!.id) {
    return res.status(403).json({ error_code: 'FORBIDDEN' });
  }

  next();
};
