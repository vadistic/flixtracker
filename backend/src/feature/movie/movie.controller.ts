import { Body, Controller, Get, NotFoundException, Query, Post } from '@nestjs/common'
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger'

import { NotFoundResponse } from '../../common/responses/not-found'

import { GetMoviesQueryDto, PostMovieDataDto } from './dto/movie.dto'
import { MovieModel } from './dto/movie.model'
import { MovieService } from './movie.service'

@Controller('/api/movies')
export class MovieController {
  constructor(readonly movieService: MovieService) {}

  @Get()
  @ApiOkResponse({
    type: MovieModel,
    isArray: true,
  })
  async getMovies(@Query() query: GetMoviesQueryDto) {
    return this.movieService.getMovies(query)
  }

  @Post()
  @ApiOkResponse({
    type: MovieModel,
  })
  @ApiNotFoundResponse({
    type: NotFoundResponse,
  })
  async postMovie(@Body() data: PostMovieDataDto) {
    const movie = await this.movieService.postMovie(data)

    if (!movie) {
      throw new NotFoundException('Movie not found')
    }

    return movie
  }
}
