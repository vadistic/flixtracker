import { InputType, PickType } from '@nestjs/graphql'

import { CommentModel } from './comment.model'

@InputType()
export class CommentCreateInput extends PickType(CommentModel, ['content', 'movieId'], InputType) {}
