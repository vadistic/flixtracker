import { InputType, Field } from '@nestjs/graphql'
import { MinLength } from 'class-validator'

@InputType()
export class UpdatePasswordInput {
  @Field()
  @MinLength(8)
  oldPassword: string

  @Field()
  @MinLength(8)
  newPassword: string
}
