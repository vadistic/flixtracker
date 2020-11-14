import { Module } from '@nestjs/common'

import { PasswordService } from '../../module/auth/password.service'
import { PrismaService } from '../../module/prisma/prisma.service'
import { UserService } from '../../services/user.service'

import { UserResolver } from './user.resolver'

@Module({
  providers: [UserResolver, UserService, PasswordService, PrismaService],
})
export class UserModule {}
