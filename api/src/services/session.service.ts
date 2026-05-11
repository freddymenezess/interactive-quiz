import prisma from '@lib/prisma.js';

export async function startSession(userId: string, quizId: string) {
  const session = await prisma.session.create({
    data: {
      userId,
      quizId,
    },
  });
  return session;
}

export async function submitAnswer(
  sessionId: string,
  questionId: string,
  optionId: string
) {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
  });

  if (!session) throw new Error('Sessão não encontrada');
  if (session.completedAt) throw new Error('Esta sessão já foi concluída');

  const answer = await prisma.sessionAnswer.upsert({
    where: {
      sessionId_questionId: { sessionId, questionId },
    },
    update: { optionId },
    create: { sessionId, questionId, optionId },
  });

  return answer;
}

export async function finishSession(sessionId: string) {
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

  if (!session) throw new Error('Sessão não encontrada');
  if (session.completedAt) throw new Error('Esta sessão já foi concluída');

  let totalScore = 0;
  for (const question of session.quiz.questions) {
    const correta = question.correctAnswer?.optionId;
    const resposta = session.answers.find((a) => a.questionId === question.id);
    if (resposta && resposta.optionId === correta) {
      totalScore += 1;
    }
  }

  await prisma.session.update({
    where: { id: sessionId },
    data: { completedAt: new Date() },
  });

  const score = await prisma.score.create({
    data: {
      sessionId,
      userId: session.userId,
      quizId: session.quizId,
      totalScore,
    },
  });

  return score;
}

export async function getSessionById(sessionId: string) {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: {
      answers: true,
      score: true,
    },
  });

  if (!session) throw new Error('Sessão não encontrada');
  return session;
}
