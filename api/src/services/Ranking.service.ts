import prisma from '@lib/prisma.js';

interface RankingEntry {
  position: number;
  userId: string;
  name: string;
  totalScore: number;
  completedAt?: Date;
}

interface Entry {
  userId: string;
  _sum: {
    totalScore: number | null;
  };
}

interface Score {
  userId: string;
  user: { name: string };
  totalScore: number;
  createdAt: Date;
}

export const getGlobalRanking = async (limit = 10): Promise<RankingEntry[]> => {
  const ranking = await prisma.score.groupBy({
    by: ['userId'],
    _sum: { totalScore: true },
    orderBy: {
      _sum: { totalScore: 'desc' },
    },
    take: limit,
  });

  return Promise.all(
    ranking.map(async (entry: Entry, index: number) => {
      const user = await prisma.user.findUnique({
        where: { id: entry.userId },
        select: { name: true },
      });

      return {
        position: index + 1,
        userId: entry.userId,
        name: user?.name ?? 'Utilizador Desconhecido',
        totalScore: entry._sum.totalScore ?? 0,
      };
    })
  );
};

export const getRankingByQuiz = async (
  quizId: string,
  limit = 10
): Promise<RankingEntry[]> => {
  const quizExists = await prisma.quiz.findUnique({ where: { id: quizId } });
  if (!quizExists) {
    throw new Error('QUIZ_NOT_FOUND');
  }

  const scores = await prisma.score.findMany({
    where: { quizId },
    orderBy: { totalScore: 'desc' },
    take: limit,
    include: {
      user: {
        select: { name: true },
      },
    },
  });

  return scores.map((score: Score, index: number) => ({
    position: index + 1,
    userId: score.userId,
    name: score.user.name,
    totalScore: score.totalScore,
    completedAt: score.createdAt,
  }));
};
