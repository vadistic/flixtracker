import { Field, ObjectType, ID } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

@ObjectType({ isAbstract: true })
export abstract class BaseModel {
  @Field(type => ID)
  @ApiProperty()
  id: string

  @Field(type => Date, {
    description: 'Identifies the date and time when the object was created.',
  })
  @ApiProperty({ type: Date })
  createdAt: Date

  @Field(type => Date, {
    description: 'Identifies the date and time when the object was last updated.',
  })
  @ApiProperty({ type: Date })
  updatedAt: Date
}
