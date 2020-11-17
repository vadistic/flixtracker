import { Field, ID, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength } from 'class-validator'

import { BaseModel } from '../../../common/base/base.model'
import { COMMENT } from '../comment.contants'

@ObjectType('Comment')
export class CommentModel extends BaseModel {
  @IsNotEmpty()
  @MaxLength(COMMENT.MAX_LENGTH)
  @Field()
  @ApiProperty({ type: String })
  content: string

  @Field(type => ID)
  @ApiProperty({ type: String })
  movieId: string

  @Field(type => ID)
  @ApiProperty({ type: String })
  authorId: string
}
