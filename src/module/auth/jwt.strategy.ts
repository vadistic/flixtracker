import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { User } from '@prisma/client'
import { Request } from 'express'
import { Strategy } from 'passport-jwt'

import { Config } from '../config/config'

import { AuthService } from './auth.service'
import { JwtDto } from './dto/jwt.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly config: Config, readonly authService: AuthService) {
    super({
      jwtFromRequest: jwtExtractor,
      secretOrKey: config.security.jwtSecret,
    })
  }

  async validate(payload: JwtDto): Promise<User> {
    const user = await this.authService.jwtAuth(payload)

    return user
  }
}

function jwtExtractor(req?: Request): string | null {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const cookieToken: string | undefined = req?.cookies?.accessToken
  const headerToken: string | undefined = req?.headers.authorization

  if (cookieToken) {
    return cookieToken
  }

  if (headerToken) {
    return headerToken.split(' ')[0]
  }

  return null
}
