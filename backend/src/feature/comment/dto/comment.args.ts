import { ArgsType, registerEnumType, IntersectionType } from '@nestjs/graphql'

import { ModelField } from '../../../common/base/field.decorator'
import { createOrderByEnum } from '../../../common/order/order-direction'
import { OrderArgs } from '../../../common/order/order.input'
import { PaginationArgs } from '../../../common/pagination/pagination.args'

import { CommentFilterInput } from './comment-filter.input'
import { CommentModel } from './comment.model'

export const CommentOrderBy = createOrderByEnum<CommentModel>()(['createdAt'])

@ArgsType()
export class CommentOrderArgs extends OrderArgs {
  @ModelField(type => CommentOrderBy, { nullable: true, enum: true })
  orderBy?: CommentOrderBy
}

@ArgsType()
export class CommentQueryArgs extends IntersectionType(CommentOrderArgs, PaginationArgs) {
  @ModelField(type => CommentFilterInput, { nullable: true })
  where?: CommentFilterInput
}

export type CommentOrderBy = typeof CommentOrderBy[keyof typeof CommentOrderBy]

registerEnumType(CommentOrderBy, { name: 'CommentOrderBy' })
