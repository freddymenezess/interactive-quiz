import { Prisma } from '@prisma/client';
import prisma from '@lib/prisma.js';

interface UserStats {
  quizzesDone: number;
  accuracy: number; // em %
  position: number; // posição global
}

type ScoreWithSession = Prisma.ScoreGetPayload<{
  include: {
    session: {
      include: {
        quiz: {
          include: { questions: true };
        };
      };
    };
  };
}>;

type GroupByScoreEntry = {
  userId: string;
  _sum: { totalScore: number | null };
};

export const getUserStats = async (userId: string): Promise<UserStats> => {
  const scores = await prisma.score.findMany({
    where: { userId },
    include: {
      session: {
        include: {
          quiz: {
            include: { questions: true },
          },
        },
      },
    },
  });

  const quizzesDone = scores.length;

  const totalCorrect = scores.reduce(
    (acc: number, s: ScoreWithSession) => acc + s.totalScore,
    0
  );
  const totalQuestions = scores.reduce(
    (acc: number, s: ScoreWithSession) => acc + s.session.quiz.questions.length,
    0
  );
  const accuracy =
    totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  const ranking = await prisma.score.groupBy({
    by: ['userId'],
    _sum: { totalScore: true },
    orderBy: { _sum: { totalScore: 'desc' } },
  });
  const position =
    ranking.findIndex((r: GroupByScoreEntry) => r.userId === userId) + 1;

  return { quizzesDone, accuracy, position };
};