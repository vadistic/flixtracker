import { Field } from '@nestjs/graphql'
import { StrategyType } from '@prisma/client'
import { IsEmail } from 'class-validator'

export class OAuthInput {
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
