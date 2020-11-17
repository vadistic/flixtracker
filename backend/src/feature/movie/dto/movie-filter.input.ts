import { Int } from '@nestjs/graphql'
import { Movie, MovieType } from '@prisma/client'
import { Length, Min, Max } from 'class-validator'

import { ModelField } from '../../../common/base/field.decorator'

export type MovieDto = Omit<Movie, 'id' | 'createdAt' | 'updatedAt' | 'comments' | 'users'>

export class MoviesFilterInput {
  @Length(2, 552)
  @ModelField(() => String, { nullable: true })
  title?: string

  @Min(1888)
  @Max(2030)
  @ModelField(() => Int, { nullable: true })
  year?: number

  @ModelField(() => MovieType, { nullable: true, enum: true })
  type?: MovieType

  @ModelField(() => String, { nullable: true })
  imdbID?: string
}
