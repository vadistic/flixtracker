import { Injectable, BadRequestException } from '@nestjs/common'

import { ChangePasswordInput } from '../module/auth/dto/change-password.input'
import { PasswordService } from '../module/auth/password.service'
import { PrismaService } from '../module/prisma/prisma.service'
import { UpdateUserInput } from '../resolvers/user/dto/update-user.input'

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

  async changePassword(userId: string, userPassword: string, changePassword: ChangePasswordInput) {
    const passwordValid = await this.passwordService.validatePassword(
      changePassword.oldPassword,
      userPassword,
    )

    if (!passwordValid) {
      throw new BadRequestException('Invalid password')
    }

    const hashedPassword = await this.passwordService.hashPassword(changePassword.newPassword)

    return this.prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: { id: userId },
    })
  }
}
