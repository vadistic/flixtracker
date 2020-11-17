import { Body, Controller, Get, Query, Post, Param, Patch, Delete } from '@nestjs/common'
import { ApiBody, ApiOkResponse } from '@nestjs/swagger'

import { MovieCreateDto } from './dto/movie-create.dto'
import { MoviesFilterDto } from './dto/movie-filter.dto'
import { MovieIdInput } from './dto/movie-id.input'
import { MovieUpdateDto } from './dto/movie-update.dto'
import { MovieModel } from './dto/movie.model'
import { MovieService } from './movie.service'

@Controller('/api/movies')
export class MovieController {
  constructor(readonly movieService: MovieService) {}

  @Get()
  @ApiOkResponse({ type: MovieModel, isArray: true })
  async getMovies(@Query() query: MoviesFilterDto) {
    return this.movieService.findManyMovies(query)
  }

  @Get('/:movieId')
  @ApiOkResponse({ type: MovieModel })
  async getMovie(@Param() param: MovieIdInput) {
    return this.movieService.findOneMovie(param)
  }

  @Post()
  @ApiBody({ type: MovieCreateDto })
  @ApiOkResponse({ type: MovieModel })
  async postMovie(@Body() data: MovieCreateDto) {
    return this.movieService.createMovie(data)
  }

  @Patch()
  @ApiBody({ type: MovieCreateDto })
  @ApiOkResponse({ type: MovieModel })
  async patchMovie(@Param() param: MovieIdInput, @Body() data: MovieUpdateDto) {
    return this.movieService.updateMovie({ ...param, ...data })
  }

  @Delete(':movieId')
  @ApiOkResponse({ type: MovieModel })
  async deleteMovie(@Param() param: MovieIdInput) {
    return this.movieService.deleteMovie(param)
  }
}
