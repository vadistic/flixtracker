import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

const prisma = new PrismaClient()

async function main() {
  dotenv.config()
  console.log('Seeding...')

  const user1 = await prisma.user.create({
    data: {
      email: 'user@example.com',
      firstname: 'Lisa',
      lastname: 'Simpson',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      role: 'USER',
      auth: 'LOCAL',
      status: 'CONFIRMED',
    },
  })
  const user2 = await prisma.user.create({
    data: {
      email: 'bart@simpson.com',
      firstname: 'Bart',
      lastname: 'Simpson',
      role: 'ADMIN',
      auth: 'LOCAL',
      status: 'CONFIRMED',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
    },
  })

  console.info(user1, user2)

  await prisma.$disconnect()
}

main().catch(e => console.error(e))
