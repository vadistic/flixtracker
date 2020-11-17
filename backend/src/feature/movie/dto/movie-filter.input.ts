import { InputType, Int } from '@nestjs/graphql'
import { MovieType } from '@prisma/client'
import { Length, Min, Max } from 'class-validator'

import { ModelField } from '../../../common/base/field.decorator'

@InputType()
export class MoviesFilterInput {
  @Length(2, 552)
  @ModelField(type => String, { nullable: true })
  title?: string

  @Min(1888)
  @Max(2030)
  @ModelField(type => Int, { nullable: true })
  year?: number

  @ModelField(type => MovieType, { nullable: true, enum: true })
  type?: MovieType

  @ModelField(type => String, { nullable: true })
  imdbID?: string
}
