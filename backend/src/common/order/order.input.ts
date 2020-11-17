import { InputType } from '@nestjs/graphql'

import { ModelField } from '../base/field.decorator'

import { OrderDirection } from './order-direction'

@InputType({ isAbstract: true })
export abstract class Order {
  @ModelField(type => OrderDirection, { enum: true, nullable: true })
  direction?: OrderDirection
}
