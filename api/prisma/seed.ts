import prisma from '../src/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const adminEmail = 'admin@quiz.com';
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await prisma.difficulty.createMany({
    data: [{ name: 'fácil' }, { name: 'médio' }, { name: 'difícil' }],
    skipDuplicates: true,
  });
  await prisma.category.createMany({
    data: [
      { name: 'Matemática' },
      { name: 'História' },
      { name: 'Ciências' },
      { name: 'Geografia' },
    ],
    skipDuplicates: true,
  });
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {}, 
    create: {
      email: adminEmail,
      name: 'Admin do Projeto',
      passwordHash: hashedPassword,
      role: 'admin',
      banned: false,
    },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
