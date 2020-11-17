import { InputType } from '@nestjs/graphql'

import { ModelField } from '../../../common/base/field.decorator'

@InputType()
export class RefreshInput {
  @ModelField(type => String)
  token: string
}

@InputType()
export class RefreshQueryDto {
  @ModelField(type => String, { nullable: true })
  token?: string
}
