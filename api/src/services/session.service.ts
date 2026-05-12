import prisma from '@lib/prisma.js';

export const startSession = async (userId: string, quizId: string) => {
  return await prisma.session.create({
    data: {
      userId,
      quizId,
    },
  });
};

export const submit = async (
  sessionId: string,
  questionId: string,
  optionId: string
) => {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
  });

  if (!session) throw new Error('SESSION_NOT_FOUND');
  if (session.completedAt) throw new Error('SESSION_ALREADY_COMPLETED');

  return await prisma.sessionAnswer.upsert({
    where: {
      sessionId_questionId: { sessionId, questionId },
    },
    update: { optionId },
    create: { sessionId, questionId, optionId },
  });
};

export const finishSession = async (sessionId: string) => {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: {
      answers: true,
      quiz: {
        include: {
          questions: {
            include: { correctAnswer: true },
          },
        },
      },
    },
  });

  if (!session) throw new Error('SESSION_NOT_FOUND');
  if (session.completedAt) throw new Error('SESSION_ALREADY_COMPLETED');

  let totalScore = 0;
  session.quiz.questions.forEach((question) => {
    const correctOptionId = question.correctAnswer?.optionId;
    const userResponse = session.answers.find(
      (a) => a.questionId === question.id
    );

    if (userResponse && userResponse.optionId === correctOptionId) {
      totalScore += 1;
    }
  });

  return await prisma.$transaction(async (tx) => {
    await tx.session.update({
      where: { id: sessionId },
      data: { completedAt: new Date() },
    });

    return await tx.score.create({
      data: {
        sessionId,
        userId: session.userId,
        quizId: session.quizId,
        totalScore,
      },
    });
  });
};

export const getSessionById = async (sessionId: string) => {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: {
      answers: true,
      score: true,
      quiz: {
        select: { title: true },
      },
    },
  });

  if (!session) throw new Error('SESSION_NOT_FOUND');
  return session;
};
