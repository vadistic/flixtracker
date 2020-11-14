import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Parent, Mutation, Args, ResolveField } from '@nestjs/graphql'

import { UserEntity } from '../../decorators/user.decorator'
import { GqlAuthGuard } from '../../guards/gql-auth.guard'
import { User } from '../../models/user.model'
import { PrismaService } from '../../services/prisma.service'
import { UserService } from '../../services/user.service'

import { ChangePasswordInput } from './dto/change-password.input'
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
