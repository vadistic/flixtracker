import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Parent, Mutation, Args, ResolveField } from '@nestjs/graphql'

import { User } from '../../models/user.model'
import { GqlAuthGuard } from '../../module/auth/auth.guard'
import { ChangePasswordInput } from '../../module/auth/dto/change-password.input'
import { UserEntity } from '../../module/auth/user.decorator'
import { PrismaService } from '../../module/prisma/prisma.service'
import { UserService } from '../../services/user.service'

import { UpdateUserInput } from './dto/update-user.input'

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
    @Args('data') changePassword: ChangePasswordInput,
  ) {
    return this.userService.changePassword(user.id, user.password, changePassword)
  }

  @ResolveField('posts')
  async posts(@Parent() author: User) {
    return this.prisma.user.findOne({ where: { id: author.id } }).posts()
  }
}
