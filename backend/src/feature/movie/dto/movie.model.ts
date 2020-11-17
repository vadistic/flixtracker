import { Float, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { MovieType } from '@prisma/client'
import { Length, Max, Min } from 'class-validator'

import { BaseModel } from '../../../common/base/base.model'
import { ModelField, ModelRelation } from '../../../common/base/field.decorator'

import { RatingModel } from './rating.model'

registerEnumType(MovieType, { name: 'MovieType' })

@ObjectType('Movie')
export class MovieModel extends BaseModel {
  @Length(2, 255)
  @ModelField(() => String)
  title: string

  @Min(1888)
  @Max(2030)
  @ModelField(() => Int)
  year: number

  @ModelField(() => MovieType, { enum: true })
  type: MovieType

  @ModelRelation(() => RatingModel)
  ratings: RatingModel[] = []

  // --- collection below

  @ModelField(() => [String])
  language!: string[]

  @ModelField(() => [String])
  country!: string[]

  @ModelField(() => [String])
  genre!: string[]

  // --- nullable below - it's hard to say what's the data in edge cases

  @ModelField(() => Date, { nullable: true })
  released?: Date

  @ModelField(() => Int, { nullable: true })
  metascore?: number

  @ModelField(() => Float, { nullable: true })
  imdbRating?: number

  @ModelField(() => Int, { nullable: true })
  imdbVotes?: number

  @ModelField(() => String, { nullable: true })
  rated?: string

  @ModelField(() => String, { nullable: true })
  runtime?: string

  @ModelField(() => String, { nullable: true })
  director?: string

  @ModelField(() => String, { nullable: true })
  writer?: string

  @ModelField(() => String, { nullable: true })
  actors?: string

  @ModelField(() => String, { nullable: true })
  plot?: string

  @ModelField(() => String, { nullable: true })
  awards?: string

  @ModelField(() => String, { nullable: true })
  poster?: string

  @ModelField(() => String, { nullable: true })
  imdbID?: string

  @ModelField(() => String, { nullable: true })
  dvd?: string

  @ModelField(() => String, { nullable: true })
  boxOffice?: string

  @ModelField(() => String, { nullable: true })
  production?: string

  @ModelField(() => String, { nullable: true })
  website?: string
}
