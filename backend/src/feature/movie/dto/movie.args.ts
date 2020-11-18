import { ArgsType, IntersectionType, registerEnumType } from '@nestjs/graphql'

import { ModelField } from '../../../common/base/field.decorator'
import { createOrderByEnum } from '../../../common/order/order-direction'
import { OrderArgs } from '../../../common/order/order.input'
import { PaginationArgs } from '../../../common/pagination/pagination.args'

import { MoviesFilterInput } from './movie-filter.input'
import { MovieModel } from './movie.model'

export const MovieOrderBy = createOrderByEnum<MovieModel>()([
  'title',
  'year',
  'createdAt',
  'type',
  'country',
  'imdbVotes',
  'imdbRating',
])

@ArgsType()
export class MovieOrderArgs extends OrderArgs {
  @ModelField(type => MovieOrderBy, { nullable: true, enum: true })
  orderBy?: MovieOrderBy
}

@ArgsType()
export class MovieQueryArgs extends IntersectionType(MovieOrderArgs, PaginationArgs) {
  @ModelField(type => MoviesFilterInput, { nullable: true })
  where?: MoviesFilterInput
}

export type MovieOrderBy = typeof MovieOrderBy[keyof typeof MovieOrderBy]

registerEnumType(MovieOrderBy, { name: 'MovieOrderBy' })
