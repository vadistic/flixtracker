import { Module } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

import { MovieModule } from '../src/feature/movie/movie.module'
import { MovieService } from '../src/feature/movie/movie.service'
import { ConfigModule } from '../src/module/config/config.module'
import { OmdbModule } from '../src/module/omdb/omdb.module'
import { PrismaModule } from '../src/module/prisma/prisma.module'

const prisma = new PrismaClient()

@Module({
  imports: [ConfigModule, MovieModule, OmdbModule, PrismaModule],
})
export class SeedModule {}

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

  const app = await NestFactory.create(SeedModule, { logger: false })

  const movieService: MovieService = app.get(MovieService)

  const m1 = await movieService.createMovie({ title: 'Kill bill' })
  const m2 = await movieService.createMovie({ title: 'The Revenant' })
  const m3 = await movieService.createMovie({ title: 'Kingdom of Heaven' })

  console.info(m1, m2, m3)

  await app.close()
}

main().catch(e => console.error(e))
