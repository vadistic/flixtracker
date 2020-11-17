import { StrategyType } from '@prisma/client'
import { IsEmail } from 'class-validator'

export class OAuthInput {
  @IsEmail()
  email: string

  strategy: StrategyType

  firstname?: string

  lastname?: string
}
