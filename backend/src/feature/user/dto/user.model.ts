import { ObjectType, registerEnumType, HideField } from '@nestjs/graphql'

import { BaseModel } from '../../../common/base/base.model'
import { PostModel } from '../../post/dto/post.model'

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
})

@ObjectType()
export class User extends BaseModel {
  email: string
  firstname?: string
  lastname?: string
  role: Role
  posts: PostModel[]

  @HideField()
  password: string
}
