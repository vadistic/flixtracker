import { Field, Float, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { MovieType } from '@prisma/client'

import { BaseModel } from '../../../common/base/base.model'

import { RatingModel } from './rating.model'

registerEnumType(MovieType, { name: 'MovieType' })

@ObjectType('Movie')
export class MovieModel extends BaseModel {
  @Field()
  @ApiProperty()
  title: string

  @Field(type => Int)
  @ApiProperty({ type: Number })
  year: number

  @Field(type => MovieType)
  @ApiProperty({ enum: MovieType })
  type: MovieType

  @Field(type => [RatingModel])
  @ApiProperty({ type: RatingModel, isArray: true })
  ratings: RatingModel[] = []

  // --- collection below

  @Field(type => [String])
  @ApiProperty({ isArray: true })
  language!: string[]

  @Field(type => [String])
  @ApiProperty({ isArray: true })
  country!: string[]

  @Field(type => [String])
  @ApiProperty({ isArray: true })
  genre!: string[]

  // --- nullable below - it's hard to say what's the data in edge cases

  @Field(type => Date, { nullable: true })
  @ApiProperty({ type: Date, nullable: true })
  released?: Date

  @Field(type => Int)
  @ApiProperty({ type: Number, nullable: true })
  metascore?: number

  @Field(type => Float)
  @ApiProperty({ type: Number, nullable: true })
  imdbRating?: number

  @Field(type => Int)
  @ApiProperty({ type: Number, nullable: true })
  imdbVotes?: number

  @Field({ nullable: true })
  @ApiProperty({ nullable: true })
  rated?: string

  @Field({ nullable: true })
  @ApiProperty({ nullable: true })
  runtime?: string

  @Field({ nullable: true })
  @ApiProperty({ nullable: true })
  director?: string

  @Field({ nullable: true })
  @ApiProperty({ nullable: true })
  writer?: string

  @Field({ nullable: true })
  @ApiProperty({ nullable: true })
  actors?: string

  @Field({ nullable: true })
  @ApiProperty({ nullable: true })
  plot?: string

  @Field({ nullable: true })
  @ApiProperty({ nullable: true })
  awards?: string

  @Field({ nullable: true })
  @ApiProperty({ nullable: true })
  poster?: string

  @Field({ nullable: true })
  @ApiProperty({ nullable: true })
  imdbID?: string

  @Field({ nullable: true })
  @ApiProperty({ nullable: true })
  dvd?: string

  @Field({ nullable: true })
  @ApiProperty({ nullable: true })
  boxOffice?: string

  @Field({ nullable: true })
  @ApiProperty({ nullable: true })
  production?: string

  @Field({ nullable: true })
  @ApiProperty({ nullable: false })
  website?: string
}
