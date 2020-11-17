import { InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, Length } from 'class-validator'

@InputType()
export class VerifyEmailRequestInput {
  @IsEmail()
  @IsNotEmpty()
  email: string
}

@InputType()
export class VerifyEmailConfirmInput {
  @Length(6, 6)
  @IsNotEmpty()
  code: string

  @IsEmail()
  @IsNotEmpty()
  email: string
}
