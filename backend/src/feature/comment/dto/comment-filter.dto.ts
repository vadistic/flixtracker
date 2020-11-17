import { ApiProperty, IntersectionType } from '@nestjs/swagger'

import { PaginationArgs } from '../../../common/pagination/pagination.args'

import { CommentOrderInput } from './comment-order.input'

export class CommentFilterDto extends IntersectionType(CommentOrderInput, PaginationArgs) {
  @ApiProperty({ required: false })
  content?: string
}
