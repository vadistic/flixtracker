import { Controller, Get, Query, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'
import ms from 'ms'
import url from 'url'

import { Config } from '../config/config'

import { AUTH_ERROR } from './auth.error'
import { AuthService } from './auth.service'
import { JwtDto } from './dto/jwt.dto'

@Controller('/auth')
export class AuthController {
  constructor(readonly authService: AuthService, readonly config: Config) {}

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() _req: Request): Promise<void> {
    // handle automagically
  }

  @Get('/google/redirect')
  googleRedirect(@Req() req: Request, @Res() res: Response): void {
    const user = req.user as JwtDto | undefined

    if (!user) {
      return res.redirect(
        url.format({
          pathname: '/recover',
        }),
      )
    }

    const { accessToken, refreshToken } = this.authService.generateTokens({ userId: user.userId })

    res.cookie('refreshToken', refreshToken, {
      maxAge: ms(this.config.auth.refreshIn),
      path: '/auth/refresh',
    })

    res.cookie('accessToken', accessToken, {
      maxAge: ms(this.config.auth.expiresIn),
    })

    return res.redirect('/')
  }

  @Get('/refresh')
  refresh(@Req() req: Request, @Query('token') queryToken?: string): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const token = queryToken ?? req?.cookies?.refreshToken

    if (!token) {
      throw new UnauthorizedException(AUTH_ERROR.MISSING_REFRESH_TOKEN)
    }

    return this.authService.refreshToken(token)
  }

  @Get('/logout')
  logout(@Res() res: Response): void {
    res.cookie('refreshToken', '', {
      maxAge: 0,
      path: '/auth/refresh',
    })

    res.cookie('accessToken', '', {
      maxAge: 0,
    })

    return res.redirect(
      url.format({
        pathname: '/login',
        query: {
          message: 'Logged out',
        },
      }),
    )
  }
}
