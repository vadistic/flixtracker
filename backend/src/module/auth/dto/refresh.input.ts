import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

@InputType()
export class RefreshInput {
  @IsString()
  @Field()
  token: string
}

@InputType()
export class RefreshQueryDto {
  @IsString()
  @ApiProperty({ type: String, required: false })
  token?: string
}
