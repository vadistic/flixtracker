import { Field, ObjectType, registerEnumType, HideField } from '@nestjs/graphql'

import { BaseModel } from './base.model'
import { Post } from './post.model'

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
  posts: Post[]
  @HideField()
  password: string
}
