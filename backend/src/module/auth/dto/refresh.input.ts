import { InputType } from '@nestjs/graphql'

import { ModelField } from '../../../common/base/field.decorator'

@InputType()
export class RefreshInput {
  @ModelField(() => String)
  token: string
}

@InputType()
export class RefreshQueryDto {
  @ModelField(() => String, { nullable: true })
  token?: string
}
