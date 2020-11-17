import { Module } from '@nestjs/common'

import { OmdbModule } from '../../module/omdb/omdb.module'
import { PrismaModule } from '../../module/prisma/prisma.module'

import { MovieController } from './movie.controller'
import { MovieResolver } from './movie.resolver'
import { MovieService } from './movie.service'

@Module({
  imports: [OmdbModule, PrismaModule],
  providers: [MovieService, MovieResolver],
  controllers: [MovieController],
  exports: [MovieService],
})
export class MovieModule {}
