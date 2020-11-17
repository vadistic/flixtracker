import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { Movie, MovieType } from '@prisma/client'
import { Transform } from 'class-transformer'
import { IsString, Length, Min, Max, IsInt, IsEnum, IsOptional } from 'class-validator'

import { PaginationArgs } from '../../../common/pagination/pagination.args'

import { MovieOrderInput } from './movie-order.input'

export type MovieDto = Omit<Movie, 'id' | 'createdAt' | 'updatedAt' | 'comments' | 'users'>

export class MoviesFilterInput {
  @Length(2, 552)
  @IsString()
  @ApiProperty({
    maxLength: 255,
    minLength: 2,
    required: false,
  })
  title?: string

  @Min(1888) // wiki tells me "Roundhay Garden Scene" was first movie in 1888
  @Max(2030)
  @IsInt()
  @IsOptional()
  @Transform(Number)
  @ApiProperty({
    type: Number,
    maxLength: 255,
    minLength: 2,
    required: false,
  })
  year?: number

  @IsEnum(MovieType)
  @IsOptional()
  @ApiProperty({ enum: MovieType, required: false })
  type?: MovieType

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  imdbID?: string
}
