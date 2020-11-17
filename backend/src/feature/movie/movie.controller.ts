import { Body, Controller, Get, Query, Post } from '@nestjs/common'
import { ApiBody, ApiOkResponse } from '@nestjs/swagger'

import { MovieCreateDto } from './dto/movie-create.dto'
import { MoviesFilterDto } from './dto/movie-filter.dto'
import { MovieModel } from './dto/movie.model'
import { MOVIE_ERROR } from './movie.error'
import { MovieService } from './movie.service'

@Controller('/api/movies')
export class MovieController {
  constructor(readonly movieService: MovieService) {}

  @Get()
  @ApiOkResponse({
    type: MovieModel,
    isArray: true,
  })
  async getMovies(@Query() query: MoviesFilterDto) {
    return this.movieService.getMovies(query)
  }

  @Post()
  @ApiBody({
    type: MovieCreateDto,
  })
  @ApiOkResponse({
    type: MovieModel,
  })
  async postMovie(@Body() data: MovieCreateDto) {
    const movie = await this.movieService.postMovie(data)

    if (!movie) {
      throw MOVIE_ERROR.NOT_ON_OMDB()
    }

    return movie
  }
}
