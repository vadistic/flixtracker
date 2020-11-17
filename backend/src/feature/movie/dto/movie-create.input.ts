import { Field, OmitType, PartialType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

import { MovieModel } from './movie.model'

export class MovieCreateInput extends PartialType(
  OmitType(MovieModel, ['id', 'createdAt', 'updatedAt']),
) {
  @Field()
  @ApiProperty()
  title: string
}
