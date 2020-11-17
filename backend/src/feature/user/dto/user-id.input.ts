import { Field, ID } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

export class UserIdInput {
  @Field(type => ID)
  @ApiProperty()
  userId: string
}
