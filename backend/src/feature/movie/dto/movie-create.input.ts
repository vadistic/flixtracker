import { InputType, OmitType, PartialType } from '@nestjs/graphql'

import { ModelField } from '../../../common/base/field.decorator'

import { MovieModel } from './movie.model'

@InputType()
export class MovieCreateInput extends PartialType(
  OmitType(MovieModel, ['id', 'createdAt', 'updatedAt', 'imdbID', 'ratings']),
  InputType,
) {
  @ModelField(type => String)
  title: string
}
