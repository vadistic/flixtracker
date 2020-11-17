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
  @ModelField(type => String)
  title: string

  @Min(1888)
  @Max(2030)
  @ModelField(type => Int)
  year: number

  @ModelField(type => MovieType, { enum: true })
  type: MovieType

  @ModelRelation(() => [RatingModel])
  ratings: RatingModel[]

  // --- collection below

  @ModelField(type => [String])
  language!: string[]

  @ModelField(type => [String])
  country!: string[]

  @ModelField(type => [String])
  genre!: string[]

  // --- nullable below - it's hard to say what's the data in edge cases

  @ModelField(type => Date, { nullable: true })
  released?: Date

  @ModelField(type => Int, { nullable: true })
  metascore?: number

  @ModelField(type => Float, { nullable: true })
  imdbRating?: number

  @ModelField(type => Int, { nullable: true })
  imdbVotes?: number

  @ModelField(type => String, { nullable: true })
  rated?: string

  @ModelField(type => String, { nullable: true })
  runtime?: string

  @ModelField(type => String, { nullable: true })
  director?: string

  @ModelField(type => String, { nullable: true })
  writer?: string

  @ModelField(type => String, { nullable: true })
  actors?: string

  @ModelField(type => String, { nullable: true })
  plot?: string

  @ModelField(type => String, { nullable: true })
  awards?: string

  @ModelField(type => String, { nullable: true })
  poster?: string

  @ModelField(type => String, { nullable: true })
  imdbID?: string

  @ModelField(type => String, { nullable: true })
  dvd?: string

  @ModelField(type => String, { nullable: true })
  boxOffice?: string

  @ModelField(type => String, { nullable: true })
  production?: string

  @ModelField(type => String, { nullable: true })
  website?: string
}
