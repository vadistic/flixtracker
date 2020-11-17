import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, MinLength } from 'class-validator'

@InputType()
export class SignupInput {
  @Field()
  @IsEmail()
  @ApiProperty()
  email: string

  @Field()
  @MinLength(8)
  @ApiProperty({ minLength: 8 })
  password: string

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  firstname?: string

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  lastname?: string
}
