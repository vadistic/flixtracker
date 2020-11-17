import { Controller, Get, Query, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiCookieAuth, ApiOkResponse } from '@nestjs/swagger'
import { Request, Response } from 'express'
import ms from 'ms'

import { Config } from '../config/config'

import { APP_ROUTES } from './auth.contants'
import { AUTH_ERROR } from './auth.error'
import { AuthService } from './auth.service'
import { JwtDto } from './dto/jwt.dto'
import { RefreshQueryDto } from './dto/refresh.input'
import { ResetPasswordConfirmInput } from './dto/reset-password.input'
import { VerifyEmailConfirmInput } from './dto/verify-email.input'

@Controller('/auth')
export class AuthController {
  constructor(readonly authService: AuthService, readonly config: Config) {}

  private setAllCookies(res: Response, payload: JwtDto) {
    const { accessToken, refreshToken } = this.authService.generateTokens(payload)

    res.cookie('refreshToken', refreshToken, {
      maxAge: ms(this.config.auth.refreshIn),
      path: '/auth/refresh',
    })

    res.cookie('accessToken', accessToken, {
      maxAge: ms(this.config.auth.expiresIn),
    })
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() _req: Request): Promise<void> {
    // handle automagically
  }

  @Get('/google/redirect')
  googleRedirect(@Req() req: Request, @Res() res: Response): void {
    const user = req.user as JwtDto | undefined

    if (!user) {
      return res.redirect(APP_ROUTES.RECOVER)
    }

    this.setAllCookies(res, user)

    return res.redirect(APP_ROUTES.HOME)
  }

  // TODO: set cookie autmatically
  @Get('/refresh')
  @ApiOkResponse()
  @ApiCookieAuth('refreshToken')
  refresh(
    @Req() req: Request,
    @Res() res: Response,
    @Query() { token: queryToken }: RefreshQueryDto,
  ): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const token = queryToken ?? req?.cookies?.refreshToken

    if (!token) {
      throw new UnauthorizedException(AUTH_ERROR.MISSING_REFRESH_TOKEN)
    }

    return this.authService.refreshToken(token)
  }

  @Get('/verify')
  async verifyEmail(@Res() res: Response, @Query() data: VerifyEmailConfirmInput): Promise<void> {
    try {
      const user = await this.authService.verifyEmailConfirm(data)

      this.setAllCookies(res, { userId: user.id })

      return res.redirect(APP_ROUTES.HOME)
    } catch (e) {
      return res.redirect(APP_ROUTES.RESEND)
    }
  }

  @Get('/reset')
  async resetPassword(
    @Res() res: Response,
    @Query() data: ResetPasswordConfirmInput,
  ): Promise<void> {
    try {
      const user = await this.authService.resetPaswordConfirm(data)

      this.setAllCookies(res, { userId: user.id })

      return res.redirect(APP_ROUTES.HOME)
    } catch (e) {
      return res.redirect(APP_ROUTES.RESET)
    }
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

    return res.redirect(APP_ROUTES.LOGIN)
  }
}
