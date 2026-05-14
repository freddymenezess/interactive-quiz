import prisma from '@lib/prisma.js';

export const getUserStats = async (userId: string) => {
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

  const totalCorrect = scores.reduce((acc, s) => acc + s.totalScore, 0);
  const totalQuestions = scores.reduce(
    (acc, s) => acc + s.session.quiz.questions.length,
    0
  );
  const accuracy =
    totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  // posição global
  const ranking = await prisma.score.groupBy({
    by: ['userId'],
    _sum: { totalScore: true },
    orderBy: { _sum: { totalScore: 'desc' } },
  });
  const position = ranking.findIndex((r) => r.userId === userId) + 1;

  return { quizzesDone, accuracy, position };
};
