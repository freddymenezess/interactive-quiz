import prisma from '@lib/prisma.js';
import type { Request, Response, NextFunction } from 'express';

export const isSessionOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionId = req.params.id as string;

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
