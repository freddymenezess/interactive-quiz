import prisma from '@lib/prisma.js';

export const getAllQuizzes = async () => {
  return prisma.quiz.findMany({
    where: { active: true },
    include: {
      category: true,
      difficulty: true,
      creator: {
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
      category: true,
      difficulty: true,
    },
  });

  if (!quiz) throw new Error('QUIZ_NOT_FOUND');
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

export const addQuestion = async (
  quizId: string,
  text: string,
  position: number,
  options: { text: string; isCorrect: boolean }[]
) => {
  const quiz = await prisma.quiz.findUnique({ where: { id: quizId } });
  if (!quiz) throw new Error('QUIZ_NOT_FOUND');

  return await prisma.$transaction(async (tx) => {
    const question = await tx.question.create({
      data: {
        text,
        quizId,
        position,
      },
    });

    const createdOptions = await Promise.all(
      options.map((opt) =>
        tx.option.create({
          data: {
            questionId: question.id,
            text: opt.text,
          },
        })
      )
    );

    const correctOptionIndex = options.findIndex((opt) => opt.isCorrect);
    if (correctOptionIndex === -1)
      throw new Error('MUST_HAVE_ONE_CORRECT_OPTION');

    const correctOption = createdOptions[correctOptionIndex];
    if (!correctOption) throw new Error('CORRECT_OPTION_NOT_CREATED');

    await tx.correctAnswer.create({
      data: {
        questionId: question.id,
        optionId: correctOption.id,
      },
    });

    return { ...question, options: createdOptions };
  });
};
