import { ObjectType } from '@nestjs/graphql'

@ObjectType('Rating')
export class RatingModel {
  source!: string
  value!: string
}
