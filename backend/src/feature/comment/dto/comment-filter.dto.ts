import { IntersectionType } from '@nestjs/swagger'

import { ModelField } from '../../../common/base/field.decorator'
import { PaginationArgs } from '../../../common/pagination/pagination.args'

import { CommentOrderInput } from './comment-order.input'

export class CommentFilterDto extends IntersectionType(CommentOrderInput, PaginationArgs) {
  @ModelField(() => String, { nullable: true })
  content?: string
}
