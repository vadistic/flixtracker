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

import { JwtDto } from './dto/jwt.dto'
import { OAuthSignupInput } from './dto/oauth.input'
import { SignupInput } from './dto/signup.input'
import { Token } from './dto/token.model'
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

  async signup(payload: SignupInput): Promise<Token> {
    const prev = await this.getUserByEmail(payload.email)

    if (prev) throw new ConflictException('Email already used')

    const hashedPassword = await this.passwordService.hashPassword(payload.password)

    try {
      const user = await this.prisma.user.create({
        data: {
          ...payload,
          password: hashedPassword,
          auth: 'LOCAL',
          role: 'USER',
        },
      })

      return this.generateToken({ userId: user.id })
    } catch (e) {
      throw new InternalServerErrorException(e, 'Signup failed')
    }
  }

  async login(email: string, password: string): Promise<Token> {
    const user = await this.getUserByEmail(email)

    if (!user) {
      throw new UnauthorizedException('Not registered')
    }

    if (user.auth !== 'LOCAL' || !user.password) {
      throw new ForbiddenException('Use social authentiation')
    }

    const passwordValid = await this.passwordService.validatePassword(password, user.password)

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid password')
    }

    return this.generateToken({
      userId: user.id,
    })
  }

  async jwtAuth(payload: JwtDto): Promise<User> {
    const user = await this.getUserById(payload.userId)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }

  async oauth({ email, firstname, lastname, strategy }: OAuthSignupInput): Promise<User> {
    const user = await this.getUserByEmail(email)

    if (user) return user

    try {
      const newUser = await this.prisma.user.create({
        data: {
          firstname,
          lastname,
          email: email,
          auth: strategy,
          role: 'USER',
        },
      })

      return newUser
    } catch (e) {
      throw new InternalServerErrorException(e, 'Signup failed')
    }
  }

  // ────────────────────────────────────────────────────────────────────────────────

  async updatePassword(userId: string, userPassword: string, data: UpdatePasswordInput) {
    const passwordValid = await this.passwordService.validatePassword(
      data.oldPassword,
      userPassword,
    )

    if (!passwordValid) {
      throw new ForbiddenException('Invalid password')
    }

    const hashedPassword = await this.passwordService.hashPassword(data.newPassword)

    return this.prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: { id: userId },
    })
  }

  async getUserById(userId: string): Promise<User | null> {
    return this.prisma.user.findOne({ where: { id: userId } })
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findOne({ where: { email: email.toLowerCase() } })
  }

  async getUserFromToken(token: string): Promise<User | null> {
    const jwt = this.jwtService.decode(token) as JwtDto

    if (!jwt?.userId) return null

    return this.prisma.user.findOne({ where: { id: jwt.userId } })
  }

  generateToken(payload: JwtDto): Token {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.config.auth.expiresIn,
    })

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.config.auth.refreshIn,
    })

    return {
      accessToken,
      refreshToken,
    }
  }

  refreshToken(token: string) {
    try {
      const { userId } = this.jwtService.verify<JwtDto>(token)
      return this.generateToken({ userId })
    } catch (e) {
      throw new UnauthorizedException()
    }
  }
}
