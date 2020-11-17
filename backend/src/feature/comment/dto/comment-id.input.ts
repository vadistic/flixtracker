import { ID, InputType } from '@nestjs/graphql'

import { ModelField } from '../../../common/base/field.decorator'

@InputType()
export class CommentIdInput {
  @ModelField(() => ID)
  commentId: string
}
