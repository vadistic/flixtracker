import { IntersectionType } from '@nestjs/swagger'

import { ModelField } from '../../../common/base/field.decorator'
import { PaginationArgs } from '../../../common/pagination/pagination.args'

import { CommentOrderArgs } from './comment.args'

export class CommentFilterDto extends IntersectionType(CommentOrderArgs, PaginationArgs) {
  @ModelField(type => String, { nullable: true })
  content?: string
}
