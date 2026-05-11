import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//Os 5 miliores**
export async function getGlobalRanking(limit = 5) {
  const ranking = await prisma.score.groupBy({
    by: ['userId'],
    _sum: { totalScore: true },
    orderBy: { _sum: { totalScore: 'desc' } },
    take: limit,
  });
  
  const rankingComNomes = await Promise.all(
    ranking.map(async (entry, index) => {
      const user = await prisma.user.findUnique({
        where: { id: entry.userId },
        select: { id: true, name: true },
      });
      return {
        position: index + 1,
        userId: entry.userId,
        name: user?.name ?? 'Desconhecido',
        totalScore: entry._sum.totalScore ?? 0,
      };
    })
  );

  return rankingComNomes;
}
export async function getRankingByQuiz(quizId: string, limit = 10) {
  const scores = await prisma.score.findMany({
    where: { quizId },
    orderBy: { totalScore: 'desc' },
    take: limit,
    include: {
      user: { select: { id: true, name: true } },
    },
  });

  return scores.map((score, index) => ({
    position: index + 1,
    userId: score.userId,
    name: score.user.name,
    totalScore: score.totalScore,
    completedAt: score.createdAt,
  }));
}
