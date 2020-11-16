import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'

import { Config } from '../config/config'
import { PrismaService } from '../prisma/prisma.service'

import { AUTH_ERROR } from './auth.error'
import { JwtDto, TokensDto } from './dto/jwt.dto'
import { OAuthInput } from './dto/oauth.input'
import { SignupInput } from './dto/signup.input'
import { UpdatePasswordInput } from './dto/update-password.input'
import { PasswordService } from './password.service'

@Injectable()
export class AuthService {
  constructor(
    readonly jwtService: JwtService,
    readonly prisma: PrismaService,
    readonly passwordService: PasswordService,
    readonly config: Config,
  ) {}

  async signup(payload: SignupInput): Promise<TokensDto> {
    const prev = await this.getUserByEmail(payload.email)

    if (prev) {
      throw new ConflictException('Email already used')
    }

    const hashedPassword = await this.passwordService.hashPassword(payload.password)

    try {
      const user = await this.prisma.user.create({
        data: {
          ...payload,
          password: hashedPassword,
          auth: 'LOCAL',
          role: 'USER',
          status: 'UNCONFIRMED',
        },
      })

      return this.generateTokens({ userId: user.id })
    } catch (e) {
      throw new InternalServerErrorException(e, 'Signup failed')
    }
  }

  async login(email: string, password: string): Promise<TokensDto> {
    const user = await this.getUserByEmail(email)

    if (!user) {
      throw new UnauthorizedException(AUTH_ERROR.NOT_REGISTERED)
    }

    if (user.status === 'BANNED') {
      throw new UnauthorizedException(AUTH_ERROR.BANNED)
    }

    if (user.status === 'UNCONFIRMED') {
      throw new UnauthorizedException(AUTH_ERROR.EMAIL_UNCONFIRMED)
    }

    if (user.auth !== 'LOCAL' || !user.password) {
      if (user.auth === 'GOOGLE') {
        throw new ForbiddenException(AUTH_ERROR.USE_GOOGLE)
      }

      throw new InternalServerErrorException(AUTH_ERROR.LOGIN_FAILED)
    }

    const passwordValid = await this.passwordService.validatePassword(password, user.password)

    if (!passwordValid) {
      throw new UnauthorizedException(AUTH_ERROR.INVALID_PASSWORD)
    }

    return this.generateTokens({
      userId: user.id,
    })
  }

  async oauth({ email, firstname, lastname, strategy }: OAuthInput): Promise<User> {
    const user = await this.getUserByEmail(email)

    if (!user) {
      try {
        const newUser = await this.prisma.user.create({
          data: {
            firstname,
            lastname,
            email: email,
            auth: strategy,
            role: 'USER',
            status: 'CONFIRMED',
          },
        })

        return newUser
      } catch (e) {
        throw new InternalServerErrorException(AUTH_ERROR.OAUTH_FAILED)
      }
    }

    if (user.auth === 'LOCAL') {
      throw new UnauthorizedException(AUTH_ERROR.USE_LOCAL)
    }

    if (user.status === 'BANNED') {
      throw new UnauthorizedException(AUTH_ERROR.BANNED)
    }

    if (user.status === 'UNCONFIRMED') {
      throw new UnauthorizedException(AUTH_ERROR.EMAIL_UNCONFIRMED)
    }

    return user
  }

  // ────────────────────────────────────────────────────────────────────────────────

  async updatePassword(userId: string, userPassword: string, data: UpdatePasswordInput) {
    const passwordValid = await this.passwordService.validatePassword(
      data.oldPassword,
      userPassword,
    )

    if (!passwordValid) {
      throw new ForbiddenException(AUTH_ERROR.INVALID_PASSWORD)
    }

    const hashedPassword = await this.passwordService.hashPassword(data.newPassword)

    return this.prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: { id: userId },
    })
  }

  // ────────────────────────────────────────────────────────────────────────────────

  async getUserById(userId: string): Promise<User | null> {
    return this.prisma.user.findOne({ where: { id: userId } })
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findOne({ where: { email: email.toLowerCase() } })
  }

  async getUserByToken(token: string): Promise<User | null> {
    const payload = this.jwtService.decode(token) as JwtDto

    if (!payload) return null

    return this.prisma.user.findOne({ where: { email: payload.userId } })
  }

  // ────────────────────────────────────────────────────────────────────────────────

  generateAccessToken(payload: JwtDto): string {
    return this.jwtService.sign(payload, {
      expiresIn: this.config.auth.expiresIn,
    })
  }

  generateRefreshToken(payload: JwtDto): string {
    return this.jwtService.sign(payload, {
      expiresIn: this.config.auth.refreshIn,
    })
  }

  generateTokens(payload: JwtDto): TokensDto {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
      payload,
    }
  }

  // ────────────────────────────────────────────────────────────────────────────────

  refreshToken(refreshToken: string): string {
    try {
      const { userId } = this.jwtService.verify<JwtDto>(refreshToken)
      return this.generateAccessToken({ userId })
    } catch (e) {
      throw new UnauthorizedException(AUTH_ERROR.INVALID_REFRESH_TOKEN)
    }
  }
}
