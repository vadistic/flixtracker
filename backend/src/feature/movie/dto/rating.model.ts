import { ObjectType } from '@nestjs/graphql'

import { ModelField } from '../../../common/base/field.decorator'

@ObjectType('Rating')
export class RatingModel {
  @ModelField(type => String)
  source: string

  @ModelField(type => String)
  value: string
}
