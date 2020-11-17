import { ObjectType } from '@nestjs/graphql'

import { ModelField } from '../../../common/base/field.decorator'

@ObjectType('Rating')
export class RatingModel {
  @ModelField(() => String)
  source: string

  @ModelField(() => String)
  value: string
}
