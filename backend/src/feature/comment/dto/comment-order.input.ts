import { InputType, registerEnumType } from '@nestjs/graphql'

import { ModelField } from '../../../common/base/field.decorator'
import { createOrderByEnum } from '../../../common/order/order-direction'
import { Order } from '../../../common/order/order.input'

import { CommentModel } from './comment.model'

export const CommentOrderBy = createOrderByEnum<CommentModel>()(['createdAt'])

@InputType()
export class CommentOrderInput extends Order {
  @ModelField(() => CommentOrderBy, { nullable: true, enum: true })
  orderBy?: CommentOrderBy
}

export type CommentOrderBy = typeof CommentOrderBy[keyof typeof CommentOrderBy]

registerEnumType(CommentOrderBy, { name: 'CommentOrderBy' })
