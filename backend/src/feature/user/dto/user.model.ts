import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { UserRole } from '@prisma/client'

import { BaseModel } from '../../../common/base/base.model'

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'User role',
})

@ObjectType('User')
export class UserModel extends BaseModel {
  email: string
  firstname?: string
  lastname?: string

  @Field(type => UserRole)
  role: UserRole
}
