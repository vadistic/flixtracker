import { StrategyType } from '@prisma/client'
import { IsEmail } from 'class-validator'

import { ModelField } from '../../../common/base/field.decorator'

export class OAuthInput {
  @IsEmail()
  @ModelField(type => String)
  email: string

  @ModelField(type => StrategyType, { enum: true })
  strategy: StrategyType

  @ModelField(type => String, { nullable: true })
  firstname?: string

  @ModelField(type => String, { nullable: true })
  lastname?: string
}
