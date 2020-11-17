import { InputType, Field } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, MinLength } from 'class-validator'

@InputType()
export class LoginInput {
  @IsEmail()
  @Field()
  @ApiProperty()
  email: string

  @MinLength(8)
  @Field()
  @ApiProperty({ minLength: 8 })
  password: string
}
