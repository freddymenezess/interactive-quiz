import type { Request, Response, NextFunction } from 'express';
import prisma from '@lib/prisma.js';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Acesso negado' });
  }
  next();
};

export const isSessionOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await prisma.session.findUnique({
    where: { id: req.params.sessionId },
  });

  if (!session) {
    return res.status(404).json({ message: 'Sessão não encontrada' });
  }

  if (session.userId !== req.user!.id) {
    return res.status(403).json({ message: 'Acesso negado' });
  }

  next();
};
