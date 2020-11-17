import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, MinLength } from 'class-validator'

@InputType()
export class SignupInput {
  @Field()
  @IsEmail()
  @ApiProperty({ type: String })
  email: string

  @Field()
  @MinLength(8)
  @ApiProperty({ type: String, minLength: 8 })
  password: string

  @Field({ nullable: true })
  @ApiProperty({ type: String, required: false })
  firstname?: string

  @Field({ nullable: true })
  @ApiProperty({ type: String, required: false })
  lastname?: string
}
