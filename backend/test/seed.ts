import { Chance } from 'chance'

import { MovieService } from '../src/feature/movie/movie.service'
import { PrismaService } from '../src/module/prisma/prisma.service'

const chance = Chance()

export const seed = async (prisma: PrismaService, movieService: MovieService) => {
  const u1 = await prisma.user.create({
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

  const u2 = await prisma.user.create({
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

  const m1 = await movieService.createMovie({ title: 'Kill bill' })
  const m2 = await movieService.createMovie({ title: 'The Revenant' })
  const m3 = await movieService.createMovie({ title: 'Kingdom of Heaven' })

  await prisma.comment.create({
    data: {
      movie: { connect: { id: m1.id } },
      author: { connect: { id: u1.id } },
      content: chance.paragraph(),
    },
  })

  await prisma.comment.create({
    data: {
      movie: { connect: { id: m1.id } },
      author: { connect: { id: u2.id } },
      content: chance.paragraph(),
    },
  })

  await prisma.comment.create({
    data: {
      movie: { connect: { id: m2.id } },
      author: { connect: { id: u1.id } },
      content: chance.paragraph(),
    },
  })

  await prisma.comment.create({
    data: {
      movie: { connect: { id: m3.id } },
      author: { connect: { id: u2.id } },
      content: chance.paragraph(),
    },
  })
}
