import prisma from '../src/lib/prisma'; 
import bcrypt from 'bcryptjs';

async function main() {
  // ─── Variáveis de ambiente ────────────────────────────────────────────────
  const adminName = process.env.ADMIN_NAME;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminGender = process.env.ADMIN_GENDER as 'male' | 'female' | undefined;

  if (!adminName || !adminEmail || !adminPassword || !adminGender) {
    throw new Error(
      'Faltam variáveis de ambiente: ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_GENDER'
    );
  }

  if (!['male', 'female'].includes(adminGender)) {
    throw new Error('ADMIN_GENDER deve ser "male" ou "female"');
  }

  // ─── Dificuldades ─────────────────────────────────────────────────────────
  await prisma.difficulty.createMany({
    data: [{ name: 'Fácil' }, { name: 'Médio' }, { name: 'Difícil' }],
    skipDuplicates: true,
  });

  // ─── Categorias ───────────────────────────────────────────────────────────
  await prisma.category.createMany({
    data: [
      { name: 'Matemática' },
      { name: 'História' },
      { name: 'Ciências' },
      { name: 'Geografia' },
      { name: 'Conhecimentos Gerais' },
    ],
    skipDuplicates: true,
  });

  // ─── Admin ────────────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: adminName,
      passwordHash: hashedPassword,
      role: 'admin',
      gender: adminGender,
      banned: false,
    },
  });

  // ─── Referências ──────────────────────────────────────────────────────────
  const categoryMath = await prisma.category.findUnique({ where: { name: 'Matemática' } });
  const categoryScience = await prisma.category.findUnique({ where: { name: 'Ciências' } });
  const categoryGeneral = await prisma.category.findUnique({ where: { name: 'Conhecimentos Gerais' } });
  const diffFacil = await prisma.difficulty.findUnique({ where: { name: 'Fácil' } });

  if (!categoryMath || !categoryScience || !categoryGeneral || !diffFacil)
    throw new Error('Categoria ou dificuldade não encontrada');

  // ─── Quiz Matemática ───────────────────────────────────────────────────────
  const quizMath = await prisma.quiz.create({
    data: {
      title: 'Matemática Básica',
      categoryId: categoryMath.id,
      difficultyId: diffFacil.id,
      createdBy: admin.id,
      active: true,
    },
  });

  const questionsMath = [
    { text: 'Quanto é 2 + 2?', options: ['3', '4', '5', '6'], correct: '4' },
    { text: 'Quanto é 10 × 5?', options: ['40', '55', '50', '45'], correct: '50' },
    { text: 'Qual é a raiz quadrada de 81?', options: ['7', '8', '9', '10'], correct: '9' },
    { text: 'Quanto é 100 ÷ 4?', options: ['20', '25', '30', '40'], correct: '25' },
    { text: 'Quanto é 7²?', options: ['42', '47', '49', '51'], correct: '49' },
  ];

  for (const [index, q] of questionsMath.entries()) {
    await prisma.$transaction(async (tx) => {
      const question = await tx.question.create({ data: { quizId: quizMath.id, text: q.text, position: index + 1 } });
      const createdOptions = await Promise.all(
        q.options.map((text) => tx.option.create({ data: { questionId: question.id, text } }))
      );
      const correctOption = createdOptions.find((o) => o.text === q.correct);
      if (!correctOption) throw new Error(`Opção correta não encontrada: ${q.correct}`);
      await tx.correctAnswer.create({ data: { questionId: question.id, optionId: correctOption.id } });
    });
  }

  // ─── Quiz Finanças Pessoais ───────────────────────────────────────────────
  const quizFinance = await prisma.quiz.create({
    data: {
      title: 'Finanças Pessoais',
      categoryId: categoryGeneral.id,
      difficultyId: diffFacil.id,
      createdBy: admin.id,
      active: true,
    },
  });

  const questionsFinance = [
    {
      text: 'O que é uma reserva de emergência?',
      options: ['Dinheiro guardado para imprevistos', 'Investimento em ações', 'Cartão de crédito', 'Empréstimo bancário'],
      correct: 'Dinheiro guardado para imprevistos',
    },
    {
      text: 'Qual é a forma mais segura de guardar dinheiro a longo prazo?',
      options: ['Ações voláteis', 'Caderneta de poupança', 'Criptomoedas instáveis', 'Investimentos em imóveis'],
      correct: 'Investimentos em imóveis',
    },
    {
      text: 'O que é juros compostos?',
      options: ['Juros sobre juros', 'Desconto de impostos', 'Multa bancária', 'Saldo negativo'],
      correct: 'Juros sobre juros',
    },
  ];

  for (const [index, q] of questionsFinance.entries()) {
    await prisma.$transaction(async (tx) => {
      const question = await tx.question.create({ data: { quizId: quizFinance.id, text: q.text, position: index + 1 } });
      const createdOptions = await Promise.all(
        q.options.map((text) => tx.option.create({ data: { questionId: question.id, text } }))
      );
      const correctOption = createdOptions.find((o) => o.text === q.correct);
      if (!correctOption) throw new Error(`Opção correta não encontrada: ${q.correct}`);
      await tx.correctAnswer.create({ data: { questionId: question.id, optionId: correctOption.id } });
    });
  }

  // ─── Quiz Tecnologia ──────────────────────────────────────────────────────
  const quizTech = await prisma.quiz.create({
    data: {
      title: 'Tecnologia no Dia a Dia',
      categoryId: categoryGeneral.id,
      difficultyId: diffFacil.id,
      createdBy: admin.id,
      active: true,
    },
  });

  const questionsTech = [
    {
      text: 'O que significa Wi-Fi?',
      options: ['Wireless Fidelity', 'World File', 'Web Find', 'Wide Fiber'],
      correct: 'Wireless Fidelity',
    },
    {
      text: 'Qual é a função de um antivírus?',
      options: ['Proteger contra malwares', 'Aumentar velocidade da internet', 'Atualizar hardware', 'Excluir arquivos'],
      correct: 'Proteger contra malwares',
    },
    {
      text: 'O que é a nuvem (cloud)?',
      options: ['Serviço de armazenamento online', 'Tipo de processador', 'Computador físico', 'Programação em JavaScript'],
      correct: 'Serviço de armazenamento online',
    },
  ];

  for (const [index, q] of questionsTech.entries()) {
    await prisma.$transaction(async (tx) => {
      const question = await tx.question.create({ data: { quizId: quizTech.id, text: q.text, position: index + 1 } });
      const createdOptions = await Promise.all(
        q.options.map((text) => tx.option.create({ data: { questionId: question.id, text } }))
      );
      const correctOption = createdOptions.find((o) => o.text === q.correct);
      if (!correctOption) throw new Error(`Opção correta não encontrada: ${q.correct}`);
      await tx.correctAnswer.create({ data: { questionId: question.id, optionId: correctOption.id } });
    });
  }

  console.log('Seed concluído com sucesso!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
