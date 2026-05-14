import type { Request, Response } from 'express';
import { getUserStats } from '@services/user.service.js';

export const myStats = async (req: Request, res: Response) => {
  try {
    const id = req.user?.id as string;
    if (!id) return res.status(400).json({ error_code: 'INVALID_USER_ID' });

    const stats = await getUserStats(id);
    return res.status(200).json(stats);
  } catch {
    return res.status(500).json({ error_code: 'INTERNAL_SERVER_ERROR' });
  }
};
