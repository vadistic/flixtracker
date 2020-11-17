import { MovieService } from '../src/feature/movie/movie.service'
import { PrismaService } from '../src/module/prisma/prisma.service'

export const seed = async (prisma: PrismaService, movieService: MovieService) => {
  await prisma.user.create({
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

  await prisma.user.create({
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

  await movieService.createMovie({ title: 'Kill bill' })
  await movieService.createMovie({ title: 'The Revenant' })
  await movieService.createMovie({ title: 'Kingdom of Heaven' })
}
