import { ObjectType } from '@nestjs/graphql'

import { Paginated } from '../../common/pagination/pagination'
import { Post } from '../post.model'

@ObjectType()
export class PostConnection extends Paginated(Post) {}
