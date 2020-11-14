import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { User } from '@prisma/client'
import { Strategy, ExtractJwt } from 'passport-jwt'

import { Config } from '../../config/config'

import { AuthService } from './auth.service'
import { JwtDto } from './dto/jwt.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly config: Config, readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.security.jwtSecret,
    })
  }

  async validate(payload: JwtDto): Promise<User> {
    const user = await this.authService.jwtAuth(payload)

    return user
  }
}
