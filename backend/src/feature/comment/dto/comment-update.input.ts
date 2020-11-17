import { InputType, PickType } from '@nestjs/graphql'

import { CommentModel } from './comment.model'

@InputType()
export class CommentUpdateInput extends PickType(CommentModel, ['content'], InputType) {}
