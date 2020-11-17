import { ApiProperty, PartialType } from '@nestjs/swagger'
import { Movie } from '@prisma/client'
import { IsString, MaxLength, MinLength } from 'class-validator'

import { PaginationArgs } from '../../../common/pagination/pagination.args'

import { MovieInput } from './movie.input'

export type MovieDto = Omit<Movie, 'id' | 'createdAt' | 'updatedAt' | 'comments' | 'users'>

export class GetMoviesQueryDto extends PaginationArgs {
  @MaxLength(255)
  @MinLength(2)
  @IsString()
  @ApiProperty({
    type: String,
    maxLength: 255,
    minLength: 2,
    example: 'Kill Bill',
    required: false,
  })
  title?: string
}

export class PostMovieDataDto extends MovieInput {}
