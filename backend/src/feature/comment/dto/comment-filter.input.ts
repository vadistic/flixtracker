import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CommentFilterInput {
  @Field({ nullable: true })
  movieId?: string

  @Field({ nullable: true })
  content?: string
}
