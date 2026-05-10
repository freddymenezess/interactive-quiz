import type { Request, Response } from 'express';
import * as adminService from '@services/admin.service.js';

export const banUser = async (req: Request, res: Response) => {
  try {
    const { reason = 'Sem motivo especificado' } = req.body || {};
    const userId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;;
    const adminId = req.user!.id;

    if (!userId) {
      return res
        .status(400)
        .json({ error_code: 'USER_ID_REQUIRED' });
    }

    await adminService.banUser(
      userId,
      adminId,
      reason
    );

    res.json({ success: true });
  } catch {
    res.status(500).json({ error_code: 'BAN_USER_FAILED' });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  const users = await adminService.listUsers();
  res.json(users);
};
