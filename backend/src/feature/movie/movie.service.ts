import { ConflictException, Injectable } from '@nestjs/common'

import { mergeDefined } from '../../common/types/empty-keys'
import { OmdbResultType } from '../../module/omdb/omdb.interfaces'
import { OmdbService } from '../../module/omdb/omdb.service'
import { PrismaService } from '../../module/prisma/prisma.service'

import { MoviesFilterDto, MovieCreateDto } from './dto/movie.dto'
import { MOVIE_ERROR } from './movie.error'

@Injectable()
export class MovieService {
  constructor(readonly prisma: PrismaService, readonly omdbService: OmdbService) {}

  async getMovies({ take, skip, cursor, ...where }: MoviesFilterDto) {
    return this.prisma.movie.findMany({
      skip,
      take,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'asc' },
      where,
    })
  }

  async postMovie(data: MovieCreateDto) {
    const omdbMovie = await this.omdbService.getMovie({
      plot: 'short',
      i: data.imdbID,
      t: data.title,
      type: data.type?.toLowerCase() as OmdbResultType,
    })

    if (!omdbMovie) {
      throw new ConflictException(MOVIE_ERROR.NOT_ON_OMDB)
    }

    try {
      const movie = await this.prisma.movie.create({
        data: mergeDefined(omdbMovie, data) as any,
      })

      return movie
    } catch (e) {
      throw new ConflictException(MOVIE_ERROR.ALREADY_PRESENT)
    }
  }
}
