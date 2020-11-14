import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Parent, Mutation, Args, ResolveField } from '@nestjs/graphql'

import { GqlAuthGuard } from '../../module/auth/auth.guard'
import { UpdatePasswordInput } from '../../module/auth/dto/update-password.input'
import { UserEntity } from '../../module/auth/user.decorator'
import { PrismaService } from '../../module/prisma/prisma.service'

import { UpdateUserInput } from './dto/update-user.input'
import { User } from './dto/user.model'
import { UserService } from './user.service'

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService, private readonly prisma: PrismaService) {}

  @Query(returns => User)
  me(@UserEntity() user: User): User {
    return user
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => User)
  async updateUser(@UserEntity() user: User, @Args('data') newUserData: UpdateUserInput) {
    return this.userService.updateUser(user.id, newUserData)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => User)
  async changePassword(
    @UserEntity() user: User,
    @Args('data') changePassword: UpdatePasswordInput,
  ) {
    return this.userService.changePassword(user.id, user.password, changePassword)
  }

  @ResolveField('posts')
  async posts(@Parent() author: User) {
    return this.prisma.user.findOne({ where: { id: author.id } }).posts()
  }
}
