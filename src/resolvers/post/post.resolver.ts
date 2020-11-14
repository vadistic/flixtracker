import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection'
import { Resolver, Query, Parent, Args, ResolveField } from '@nestjs/graphql'

import { PaginationArgs } from '../../common/pagination/pagination.args'
import { PostIdArgs } from '../../models/args/post-id.args'
import { UserIdArgs } from '../../models/args/user-id.args'
import { PostOrder } from '../../models/inputs/post-order.input'
import { PostConnection } from '../../models/pagination/post-connection.model'
import { Post } from '../../models/post.model'
import { PrismaService } from '../../module/prisma/prisma.service'

@Resolver(() => Post)
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

  @Query(returns => [Post])
  async userPostCollection(@Args() id: UserIdArgs) {
    return this.prisma.user
      .findOne({ where: { id: id.userId } })
      .posts({ where: { published: true } })
  }

  @Query(returns => Post)
  async post(@Args() id: PostIdArgs) {
    return this.prisma.post.findOne({ where: { id: id.postId } })
  }

  @ResolveField('author')
  async author(@Parent() post: Post) {
    return this.prisma.post.findOne({ where: { id: post.id } }).author()
  }
}
