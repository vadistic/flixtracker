import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection'
import { Resolver, Query, Parent, Args, ResolveField } from '@nestjs/graphql'

import { PaginationArgs } from '../../common/pagination/pagination.args'
import { PrismaService } from '../../module/prisma/prisma.service'
import { UserIdArgs } from '../user/dto/user-id.args'

import { PostConnection } from './dto/post-connection.model'
import { PostIdArgs } from './dto/post-id.args'
import { PostOrder } from './dto/post-order.input'
import { PostModel } from './dto/post.model'

@Resolver(() => PostModel)
export class PostResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(returns => PostConnection)
  async postConnection(
    @Args() { skip, after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({
      name: 'orderBy',
      type: () => PostOrder,
      nullable: true,
    })
    orderBy: PostOrder,
  ) {
    return findManyCursorConnection(
      async args =>
        this.prisma.post.findMany({
          include: { author: true },
          where: {
            published: true,
            title: { contains: query || '' },
          },
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : undefined,
          ...args,
          skip,
        }),
      async () =>
        this.prisma.post.count({
          where: {
            published: true,
            title: { contains: query || '' },
          },
        }),
      { first, last, before, after },
    )
  }

  @Query(returns => [PostModel])
  async userPostCollection(@Args() id: UserIdArgs) {
    return this.prisma.user
      .findOne({ where: { id: id.userId } })
      .posts({ where: { published: true } })
  }

  @Query(returns => PostModel)
  async post(@Args() id: PostIdArgs) {
    return this.prisma.post.findOne({ where: { id: id.postId } })
  }

  @ResolveField('author')
  async author(@Parent() post: PostModel) {
    return this.prisma.post.findOne({ where: { id: post.id } }).author()
  }
}
