import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

import { createOrderByEnum } from '../../../common/order/order-direction'
import { Order } from '../../../common/order/order.input'

import { CommentModel } from './comment.model'

export const CommentOrderBy = createOrderByEnum<CommentModel>()(['createdAt'])

@InputType()
export class CommentOrderInput extends Order {
  @Field(type => CommentOrderBy, { nullable: true })
  @ApiProperty({
    enum: CommentOrderBy,
    required: false,
  })
  orderBy?: CommentOrderBy
}

export type CommentOrderBy = typeof CommentOrderBy[keyof typeof CommentOrderBy]

registerEnumType(CommentOrderBy, { name: 'CommentOrderBy' })
