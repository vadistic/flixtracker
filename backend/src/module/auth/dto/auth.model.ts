import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('Auth')
export class AuthModel {
  @Field({ description: 'JWT access token' })
  accessToken: string

  @Field({ description: 'JWT refresh token' })
  refreshToken: string
}
