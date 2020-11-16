import { InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, Length } from 'class-validator'

@InputType()
export class VerifyEmailInput {
  @Length(6, 6)
  @IsNotEmpty()
  code: string

  @IsEmail()
  @IsNotEmpty()
  email: string
}
