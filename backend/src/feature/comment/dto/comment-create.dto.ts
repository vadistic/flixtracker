import { PickType } from '@nestjs/swagger'

import { CommentModel } from './comment.model'

export class CommentCreateDto extends PickType(CommentModel, ['content', 'movieId']) {}
