import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'

import { Token } from '../../models/token.model'

import { AuthService } from './auth.service'
import { JwtDto } from './dto/jwt.dto'

@Controller('/oauth')
export class OAuthController {
  constructor(readonly authService: AuthService) {}

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() _req: Request) {
    // automagically
  }

  @Get('/google/redirect')
  googleRedirect(@Req() req: Request): Token | undefined {
    if (req.user) {
      return this.authService.generateToken({ userId: (req.user as JwtDto).userId })
    }
  }
}
