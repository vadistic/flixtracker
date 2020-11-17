import { InputType, OmitType, PartialType } from '@nestjs/graphql'

import { MovieModel } from './movie.model'

@InputType()
export class MovieInput extends PartialType(
  OmitType(MovieModel, ['id', 'createdAt', 'updatedAt']),
  InputType,
) {}
