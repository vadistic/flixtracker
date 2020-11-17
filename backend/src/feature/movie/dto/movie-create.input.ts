import { OmitType, PartialType } from '@nestjs/graphql'

import { ModelField } from '../../../common/base/field.decorator'

import { MovieModel } from './movie.model'

export class MovieCreateInput extends PartialType(
  OmitType(MovieModel, ['id', 'createdAt', 'updatedAt', 'imdbID']),
) {
  @ModelField(() => String)
  title: string
}
