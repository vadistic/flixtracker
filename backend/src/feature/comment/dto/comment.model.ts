import { ID, ObjectType } from '@nestjs/graphql'
import { MaxLength } from 'class-validator'

import { BaseModel } from '../../../common/base/base.model'
import { ModelField } from '../../../common/base/field.decorator'
import { COMMENT } from '../comment.contants'

@ObjectType('Comment')
export class CommentModel extends BaseModel {
  @MaxLength(COMMENT.MAX_LENGTH)
  @ModelField(type => String)
  content: string

  @ModelField(type => ID)
  movieId: string

  @ModelField(type => ID)
  authorId: string
}
