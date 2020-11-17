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
  @ApiProperty({ type: Date, required: false })
  released?: Date

  @Field(type => Int)
  @ApiProperty({ type: Number, required: false })
  metascore?: number

  @Field(type => Float)
  @ApiProperty({ type: Number, required: false })
  imdbRating?: number

  @Field(type => Int)
  @ApiProperty({ type: Number, required: false })
  imdbVotes?: number

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  rated?: string

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  runtime?: string

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  director?: string

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  writer?: string

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  actors?: string

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  plot?: string

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  awards?: string

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  poster?: string

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  imdbID?: string

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  dvd?: string

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  boxOffice?: string

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  production?: string

  @Field({ nullable: true })
  @ApiProperty({ nullable: false })
  website?: string
}
