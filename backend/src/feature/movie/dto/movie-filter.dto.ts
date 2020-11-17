import { IntersectionType } from '@nestjs/swagger'

import { PaginationArgs } from '../../../common/pagination/pagination.args'

import { MoviesFilterInput } from './movie-filter.input'
import { MovieOrderInput } from './movie-order.input'

export class MoviesFilterDto extends IntersectionType(
  MoviesFilterInput,
  IntersectionType(MovieOrderInput, PaginationArgs),
) {}
