import { Injectable, Module } from '@nestjs/common'

import { CommentModule } from '../../src/feature/comment/comment.module'
import { MovieModule } from '../../src/feature/movie/movie.module'
import { MovieService } from '../../src/feature/movie/movie.service'
import { ConfigModule } from '../../src/module/config/config.module'
import { OmdbModule } from '../../src/module/omdb/omdb.module'
import { PrismaModule } from '../../src/module/prisma/prisma.module'
import { PrismaService } from '../../src/module/prisma/prisma.service'
import { seed } from '../seed'

import { databaseDrop, prismaMigrateSave, prismaMigrateUp } from './db'

@Injectable()
export class UtilService {
  constructor(readonly prisma: PrismaService, readonly movieService: MovieService) {}

  async bootstrap() {
    await databaseDrop(this.prisma)
    await prismaMigrateSave(this.prisma)
    await prismaMigrateUp(this.prisma)
    await seed(this.prisma, this.movieService)
  }

  async setup() {
    await databaseDrop(this.prisma)
    await prismaMigrateUp(this.prisma)
    await seed(this.prisma, this.movieService)
  }

  async clean() {
    await databaseDrop(this.prisma)
  }
}

@Module({
  imports: [ConfigModule, MovieModule, CommentModule, OmdbModule, PrismaModule],
  providers: [UtilService],
  exports: [UtilService],
})
export class UtilModule {}
