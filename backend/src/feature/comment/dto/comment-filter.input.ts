import { ID, InputType } from '@nestjs/graphql'

import { ModelField } from '../../../common/base/field.decorator'

@InputType()
export class CommentFilterInput {
  @ModelField(type => ID, { nullable: true })
  movieId?: string

  @ModelField(type => ID, { nullable: true })
  authorId?: string

  @ModelField(type => String, { nullable: true })
  content?: string
}
