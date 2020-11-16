import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Parent, Mutation, Args, ResolveField } from '@nestjs/graphql'

import { PrismaObject, PrismaPromise } from '../../common/types/utils'
import { GqlAuthGuard } from '../../module/auth/auth.guard'
import { CtxUser } from '../../module/auth/user.decorator'
import { PrismaService } from '../../module/prisma/prisma.service'
import { PostModel } from '../post/dto/post.model'

import { UpdateUserInput } from './dto/update-user.input'
import { UserModel } from './dto/user.model'
import { UserService } from './user.service'

@Resolver(() => UserModel)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService, private readonly prisma: PrismaService) {}

  @Query(returns => UserModel)
  me(@CtxUser() user: CtxUser): PrismaObject<UserModel> {
    return user
  }

  @Mutation(returns => UserModel)
  async updateUser(
    @CtxUser() user: CtxUser,
    @Args('data') newUserData: UpdateUserInput,
  ): PrismaPromise<UserModel> {
    return this.userService.updateUser(user.id, newUserData)
  }

  @ResolveField(type => [PostModel])
  async posts(@Parent() author: UserModel): PrismaPromise<PostModel[]> {
    return this.prisma.user.findOne({ where: { id: author.id } }).posts()
  }
}
