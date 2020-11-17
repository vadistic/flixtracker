import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

import { OrderDirection } from './order-direction'

@InputType({ isAbstract: true })
export abstract class Order {
  @Field(type => OrderDirection, { nullable: true })
  @ApiProperty({ enum: OrderDirection, required: false })
  direction?: OrderDirection
}
