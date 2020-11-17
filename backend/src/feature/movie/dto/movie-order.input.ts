import { InputType, registerEnumType } from '@nestjs/graphql'

import { ModelField } from '../../../common/base/field.decorator'
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
  @ModelField(type => MovieOrderBy, { nullable: true, enum: true })
  orderBy?: MovieOrderBy
}
