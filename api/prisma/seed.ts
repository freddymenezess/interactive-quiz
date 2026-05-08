import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.difficulty.createMany({
    data: [{ name: 'fácil' }, { name: 'médio' }, { name: 'difícil' }],
    skipDuplicates: true,
  })
  await prisma.category.createMany({
    data: [
      { name: 'Matemática' }, { name: 'História' },
      { name: 'Ciências' },   { name: 'Geografia' },
    ],
    skipDuplicates: true,
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())