import { IntersectionType } from '@nestjs/swagger'

import { PaginationArgs } from '../../../common/pagination/pagination.args'

import { MoviesFilterInput } from './movie-filter.input'
import { MovieOrderArgs } from './movie.args'

export class MoviesFilterDto extends IntersectionType(
  MoviesFilterInput,
  IntersectionType(MovieOrderArgs, PaginationArgs),
) {}
