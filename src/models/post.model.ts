import { Field, ObjectType } from '@nestjs/graphql'

import { BaseModel } from './base.model'
import { User } from './user.model'

@ObjectType()
export class Post extends BaseModel {
  title: string
  content: string
  published: boolean
  author: User
}
