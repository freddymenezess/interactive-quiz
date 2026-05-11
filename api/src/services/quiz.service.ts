import prisma from '@lib/prisma.js';

export const getAllQuizzes = async () => {
  return prisma.quiz.findMany({
    where: { active: true },
    include: {
      category: true,
      difficulty: true,
      createdBy: {
        select: { name: true },
      },
    },
  });
};

export const getQuizById = async (id: string) => {
  const quiz = await prisma.quiz.findUnique({
    where: { id },
    include: {
      questions: {
        orderBy: { position: 'asc' },
        include: {
          options: true,
        },
      },
    },
  });

  if (!quiz) throw new Error('Quiz não encontrado');
  return quiz;
};

export const createQuiz = async (data: {
  title: string;
  categoryId: number;
  difficultyId: number;
  createdBy: string;
}) => {
  return prisma.quiz.create({ data });
};

export const startSession = async (userId: string, quizId: string) => {
  const quiz = await prisma.quiz.findUnique({ where: { id: quizId } });
  if (!quiz) throw new Error('Quiz não encontrado');

  return prisma.session.create({
    data: { userId, quizId },
  });
};

export const submitAnswer = async (data: {
  sessionId: string;
  questionId: string;
  optionId: string;
}) => {
  const existing = await prisma.sessionAnswer.findUnique({
    where: {
      sessionId_questionId: {
        sessionId: data.sessionId,
        questionId: data.questionId,
      },
    },
  });
  if (existing) throw new Error('Pergunta já respondida');

  return prisma.sessionAnswer.create({ data });
};

export const finishSession = async (sessionId: string, userId: string) => {
  const answers = await prisma.sessionAnswer.findMany({
    where: { sessionId },
  });

  const correctAnswers = await prisma.correctAnswer.findMany({
    where: {
      questionId: { in: answers.map((a) => a.questionId) },
    },
  });

  let score = 0;
  for (const answer of answers) {
    const correct = correctAnswers.find(
      (c) => c.questionId === answer.questionId
    );
    if (correct?.optionId === answer.optionId) score++;
  }

  await prisma.session.update({
    where: { id: sessionId },
    data: { completedAt: new Date() },
  });

  return prisma.score.create({
    data: { sessionId, userId, quizId: sessionId, totalScore: score },
  });
};
