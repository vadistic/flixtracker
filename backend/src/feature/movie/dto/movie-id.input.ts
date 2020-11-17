import { Field, ID, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

@InputType()
export class MovieIdInput {
  @Field(type => ID)
  @ApiProperty({ type: String })
  movieId: string
}
