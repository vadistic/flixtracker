import { Field, Float, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { MovieType } from '@prisma/client'

import { BaseModel } from '../../../common/base/base.model'

import { RatingModel } from './rating.model'

registerEnumType(MovieType, { name: 'MovieType' })

@ObjectType('Movie')
export class MovieModel extends BaseModel {
  title: string

  @Field(type => Int)
  year: number

  @Field(type => MovieType)
  type: MovieType

  @Field(type => [RatingModel])
  ratings: RatingModel[] = []

  // --- collection below

  @Field(type => [String])
  language!: string[]

  @Field(type => [String])
  country!: string[]

  @Field(type => [String])
  genre!: string[]

  // --- nullable below - it's hard to say what's the data in edge cases

  rated?: string

  released?: Date

  runtime?: string

  director?: string

  writer?: string

  actors?: string

  plot?: string

  awards?: string

  poster?: string

  @Field(type => Int)
  metascore?: number

  @Field(type => Float)
  imdbRating?: number

  @Field(type => Int)
  imdbVotes?: number

  imdbID?: string

  dvd?: string

  boxOffice?: string

  production?: string

  website?: string
}
