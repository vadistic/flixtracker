import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

import { createOrderByEnum } from '../../../common/order/order-direction'
import { Order } from '../../../common/order/order.input'

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

export type MovieOrderBy = typeof MovieOrderBy[keyof typeof MovieOrderBy]

registerEnumType(MovieOrderBy, { name: 'MovieOrderBy' })

@InputType()
export class MovieOrderInput extends Order {
  @Field(type => MovieOrderBy, { nullable: true })
  @ApiProperty({
    enum: MovieOrderBy,
    required: false,
  })
  orderBy?: MovieOrderBy
}
