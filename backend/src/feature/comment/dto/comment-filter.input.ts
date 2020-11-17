import { InputType } from '@nestjs/graphql'

import { ModelField } from '../../../common/base/field.decorator'

@InputType()
export class CommentFilterInput {
  @ModelField(type => String, { nullable: true })
  movieId?: string

  @ModelField(type => String, { nullable: true })
  content?: string
}
