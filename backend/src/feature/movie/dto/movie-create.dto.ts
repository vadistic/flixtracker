import { OmitType, PartialType } from '@nestjs/swagger'

import { ModelField } from '../../../common/base/field.decorator'

import { MovieModel } from './movie.model'

export class MovieCreateDto extends PartialType(
  OmitType(MovieModel, ['id', 'createdAt', 'updatedAt', 'imdbID']),
) {
  @ModelField(type => String)
  title: string
}
