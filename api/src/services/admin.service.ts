import prisma from '@lib/prisma.js';

export const banUser = async (userId: string, adminId: string, reason: string) => {
  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.update({
      where: { id: userId },
      data: { banned: true },
    });

    await tx.banLog.create({
      data: {
        userId,
        adminId,
        reason,
      },
    });

    return user;
  });
};

export const listUsers = async () => {
  return await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, banned: true }
  });
};