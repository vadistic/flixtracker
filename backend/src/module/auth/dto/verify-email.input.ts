import { InputType } from '@nestjs/graphql'
import { IsEmail, Length } from 'class-validator'

@InputType()
export class VerifyEmailRequestInput {
  @IsEmail()
  email: string
}

@InputType()
export class VerifyEmailConfirmInput {
  @Length(6, 6)
  code: string

  @IsEmail()
  email: string
}
