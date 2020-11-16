import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { User } from '@prisma/client'
import { Request } from 'express'
import { Strategy } from 'passport-jwt'

import { Config } from '../../config/config'
import { AUTH_ERROR } from '../auth.error'
import { AuthService } from '../auth.service'
import { JwtDto } from '../dto/jwt.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly config: Config, readonly authService: AuthService) {
    super({
      jwtFromRequest: accessTokenExtractor,
      secretOrKey: config.auth.jwtSecret,
    })
  }

  async validate(payload: JwtDto): Promise<User> {
    const user = await this.authService.getUserById(payload.userId)

    if (!user) {
      throw new UnauthorizedException(AUTH_ERROR.UNAUTHORIZED)
    }

    if (user.status === 'BANNED') {
      throw new UnauthorizedException(AUTH_ERROR.BANNED)
    }

    if (user.status === 'UNCONFIRMED') {
      throw new UnauthorizedException(AUTH_ERROR.EMAIL_UNCONFIRMED)
    }

    return user
  }
}

function accessTokenExtractor(req?: Request): string | null {
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
