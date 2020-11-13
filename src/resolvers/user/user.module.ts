import { Module } from '@nestjs/common'

import { PasswordService } from '../../services/password.service'
import { PrismaService } from '../../services/prisma.service'
import { UserService } from '../../services/user.service'

import { UserResolver } from './user.resolver'

@Module({
  providers: [UserResolver, UserService, PasswordService, PrismaService],
})
export class UserModule {}
