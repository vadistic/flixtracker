import { PickType } from '@nestjs/swagger'

import { CommentModel } from './comment.model'

export class CommentUpdateDto extends PickType(CommentModel, ['content']) {}
