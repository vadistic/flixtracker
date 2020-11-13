import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { hash, compare } from 'bcrypt'

import { SecurityConfig } from '../configs/config.interface'

@Injectable()
export class PasswordService {
  get bcryptSaltRounds(): string | number {
    const securityConfig = this.configService.get<SecurityConfig>('security')
    const saltOrRounds = securityConfig.bcryptSaltOrRound

    return Number.isInteger(Number(saltOrRounds)) ? Number(saltOrRounds) : saltOrRounds
  }

  constructor(private readonly configService: ConfigService) {}

  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword)
  }

  async hashPassword(password: string): Promise<string> {
    return hash(password, this.bcryptSaltRounds)
  }
}
