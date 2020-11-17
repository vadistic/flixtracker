import { InputType } from '@nestjs/graphql'

import { ModelField } from '../../../common/base/field.decorator'

@InputType()
export class CommentFilterInput {
  @ModelField(() => String, { nullable: true })
  movieId?: string

  @ModelField(() => String, { nullable: true })
  content?: string
}
