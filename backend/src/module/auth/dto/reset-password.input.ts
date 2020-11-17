import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, Length, MinLength } from 'class-validator'

@InputType()
export class ResetPasswordRequestInput {
  @Field()
  @IsEmail()
  @ApiProperty({ type: String })
  email: string
}

@InputType()
export class ResetPasswordConfirmInput {
  @Length(6, 6)
  @Field()
  @ApiProperty({ type: String, minLength: 6, maxLength: 6 })
  code: string

  @Field()
  @IsEmail()
  @ApiProperty({ type: String })
  email: string

  @Field()
  @MinLength(8)
  @ApiProperty({ type: String, minLength: 8 })
  newPassword: string
}
