import { OmitType, PartialType } from '@nestjs/swagger'

import { MovieModel } from './movie.model'

export class MovieCreateDto extends PartialType(
  OmitType(MovieModel, ['id', 'createdAt', 'updatedAt']),
) {}
