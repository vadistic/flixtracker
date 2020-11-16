import { Field, ObjectType } from '@nestjs/graphql'

import { BaseModel } from '../../../common/base/base.model'

import { UserRole } from './user-role.enum'

@ObjectType('User')
export class UserModel extends BaseModel {
  email: string
  firstname?: string
  lastname?: string

  @Field(type => UserRole)
  role: UserRole
}
