import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, Length } from 'class-validator'

@InputType()
export class VerifyEmailRequestInput {
  @IsEmail()
  @Field()
  @ApiProperty()
  email: string
}

@InputType()
export class VerifyEmailConfirmInput {
  @Length(6, 6)
  @Field()
  @ApiProperty({ minLength: 6, maxLength: 6 })
  code: string

  @IsEmail()
  @Field()
  @ApiProperty()
  email: string
}
