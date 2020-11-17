import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, Length, MinLength } from 'class-validator'

@InputType()
export class ResetPasswordRequestInput {
  @Field()
  @IsEmail()
  @ApiProperty()
  email: string
}

@InputType()
export class ResetPasswordConfirmInput {
  @Length(6, 6)
  @Field()
  @ApiProperty({ minLength: 6, maxLength: 6 })
  code: string

  @Field()
  @IsEmail()
  @ApiProperty()
  email: string

  @Field()
  @MinLength(8)
  @ApiProperty({ minLength: 8 })
  newPassword: string
}
