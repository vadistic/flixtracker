import { ArgsType, Field, ID, Int } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsInt, IsString, Max, Min } from 'class-validator'

@ArgsType()
export class PaginationArgs {
  @IsInt()
  @Transform(Number)
  @Field(type => Int, { nullable: true })
  @ApiProperty({ type: Number, required: false })
  skip?: number

  @Min(1)
  @Max(100)
  @IsInt()
  @Transform(Number)
  @Field(type => Int, { nullable: true })
  @ApiProperty({
    type: Number,
    required: false,
    minimum: 1,
    maximum: 100,
  })
  take?: number

  @IsString()
  @Field(type => ID, { nullable: true })
  @ApiProperty({ type: String, required: false })
  cursor?: string
}
