import { ObjectType } from '@nestjs/graphql'

import { User } from '../../../feature/user/dto/user.model'

import { Token } from './token.model'

@ObjectType()
export class Auth extends Token {
  user: User
}
