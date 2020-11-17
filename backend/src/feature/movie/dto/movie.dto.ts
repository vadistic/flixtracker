import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger'
import { Movie } from '@prisma/client'
import { IsString, MaxLength, MinLength } from 'class-validator'

import { PaginationArgs } from '../../../common/pagination/pagination.args'

import { MovieModel } from './movie.model'

export type MovieDto = Omit<Movie, 'id' | 'createdAt' | 'updatedAt' | 'comments' | 'users'>

export class MoviesFilterDto extends PaginationArgs {
  @MaxLength(255)
  @MinLength(2)
  @IsString()
  @ApiProperty({
    maxLength: 255,
    minLength: 2,
    example: 'Kill Bill',
    required: false,
  })
  title?: string
}

export class MovieCreateDto extends PartialType(
  OmitType(MovieModel, ['id', 'createdAt', 'updatedAt']),
) {}
