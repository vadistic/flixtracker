import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

@ObjectType('Rating')
export class RatingModel {
  @Field()
  @ApiProperty()
  source: string

  @Field()
  @ApiProperty()
  value: string
}
