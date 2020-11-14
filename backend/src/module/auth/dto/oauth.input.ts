import { Field, registerEnumType } from '@nestjs/graphql'
import { StrategyType } from '@prisma/client'
import { IsEmail } from 'class-validator'

registerEnumType(StrategyType, { name: 'StrategyType' })

export class OAuthSignupInput {
  @Field()
  @IsEmail()
  email: string

  @Field()
  strategy: StrategyType

  @Field({ nullable: true })
  firstname?: string

  @Field({ nullable: true })
  lastname?: string
}
