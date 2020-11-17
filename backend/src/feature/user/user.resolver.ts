import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'

import { PrismaObject, PrismaPromise } from '../../common/types/utils'
import { JwtGuard } from '../../module/auth/jwt.guard'
import { CtxUser } from '../../module/auth/user.decorator'
import { PrismaService } from '../../module/prisma/prisma.service'

import { UpdateUserInput } from './dto/update-user.input'
import { UserModel } from './dto/user.model'
import { UserService } from './user.service'

@Resolver(() => UserModel)
@UseGuards(JwtGuard)
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
}
