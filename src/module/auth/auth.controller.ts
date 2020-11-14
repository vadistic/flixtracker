import {
  Controller,
  ForbiddenException,
  Get,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'
import ms from 'ms'
import url from 'url'

import { Config } from '../config/config'

import { AuthService } from './auth.service'
import { JwtDto } from './dto/jwt.dto'

@Controller('/auth')
export class AuthController {
  constructor(readonly authService: AuthService, readonly config: Config) {}

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() _req: Request) {
    // handle automagically
  }

  @Get('/google/redirect')
  googleRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as JwtDto | undefined

    if (user) {
      const token = this.authService.generateToken({ userId: user.userId })

      res.cookie('refreshToken', token.refreshToken, {
        maxAge: ms(this.config.security.refreshIn),
        path: '/auth/refresh',
      })

      res.cookie('accessToken', token.accessToken, {
        maxAge: ms(this.config.security.expiresIn),
      })

      return res.redirect(this.config.security.authorizedRedirect)
    }

    return res.redirect(
      url.format({
        pathname: this.config.security.unauthorizedRedirect,
        query: {
          message: 'Google Authentication failed',
        },
      }),
    )
  }

  /** alternative code exchange mode */
  @Get('/google/token')
  googleToken(@Req() req: Request) {
    const user = req.user as JwtDto | undefined

    if (user) {
      return this.authService.generateToken({ userId: user.userId })
    }

    throw new ForbiddenException('Cannot retrive token')
  }

  @Get('/refresh')
  refresh(@Req() req: Request, @Query('token') queryToken?: string) {
    if (queryToken) {
      return this.authService.refreshToken(queryToken)
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const cookieToken: string | undefined = req?.cookies?.refreshToken

    if (cookieToken) {
      return this.authService.refreshToken(cookieToken)
    }

    throw new UnauthorizedException('Missing refresh token')
  }

  @Get('/logout')
  logout(@Res() res: Response) {
    res.cookie('refreshToken', '', {
      maxAge: 0,
      path: '/auth/refresh',
    })

    res.cookie('accessToken', '', {
      maxAge: 0,
    })

    return res.redirect(
      url.format({
        pathname: this.config.security.unauthorizedRedirect,
        query: {
          message: 'Logged out',
        },
      }),
    )
  }
}
