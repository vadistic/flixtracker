import { ArgsType } from '@nestjs/graphql'

import { ModelField } from '../base/field.decorator'

import { OrderDirection } from './order-direction'

@ArgsType()
export abstract class OrderArgs {
  @ModelField(type => OrderDirection, { enum: true, nullable: true })
  direction?: OrderDirection
}
