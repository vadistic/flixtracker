import { ObjectType } from '@nestjs/graphql'

import { BaseModel } from '../../../common/base/base.model'
import { User } from '../../user/dto/user.model'

@ObjectType('Post')
export class PostModel extends BaseModel {
  title: string
  content: string
  published: boolean
  author: User
}
