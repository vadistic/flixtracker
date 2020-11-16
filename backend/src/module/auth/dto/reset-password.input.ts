import { InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, Length, MinLength } from 'class-validator'

@InputType()
export class ResetPasswordInput {
  @Length(6, 6)
  @IsNotEmpty()
  code: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  @MinLength(8)
  newPassword: string
}