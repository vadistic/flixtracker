import { Injectable } from '@nestjs/common'
import { hash, compare } from 'bcrypt'

import { Config } from '../../config/config'

@Injectable()
export class PasswordService {
  constructor(private readonly config: Config) {}

  get bcryptSaltRounds(): string | number {
    const saltOrRounds = this.config.security.bcryptSaltOrRound

    return Number.isInteger(Number(saltOrRounds)) ? Number(saltOrRounds) : saltOrRounds
  }

  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword)
  }

  async hashPassword(password: string): Promise<string> {
    return hash(password, this.bcryptSaltRounds)
  }
}
