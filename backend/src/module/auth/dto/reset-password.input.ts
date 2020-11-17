import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, Length, MinLength } from 'class-validator'

@InputType()
export class ResetPasswordRequestInput {
  @Field()
  @IsEmail()
  email: string
}

@InputType()
export class ResetPasswordConfirmInput {
  @Field()
  @Length(6, 6)
  code: string

  @Field()
  @IsEmail()
  email: string

  @Field()
  @MinLength(8)
  newPassword: string
}
