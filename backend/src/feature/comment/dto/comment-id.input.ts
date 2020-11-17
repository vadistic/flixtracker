import { Field, ID, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

@InputType()
export class CommentIdInput {
  @Field(type => ID)
  @ApiProperty()
  commentId: string
}
