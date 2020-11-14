import { ObjectType } from '@nestjs/graphql'

import { Paginated } from '../../../common/pagination/paginated'

import { PostModel } from './post.model'

@ObjectType()
export class PostConnection extends Paginated(PostModel) {}
