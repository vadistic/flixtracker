import { Injectable } from '@nestjs/common'

import { PasswordService } from '../../module/auth/password.service'
import { PrismaService } from '../../module/prisma/prisma.service'

import { UpdateUserInput } from './dto/update-user.input'

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
  ) {}

  updateUser(userId: string, newUserData: UpdateUserInput) {
    return this.prisma.user.update({
      data: newUserData,
      where: {
        id: userId,
      },
    })
  }
}
