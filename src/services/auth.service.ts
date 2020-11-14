import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User, PrismaClientKnownRequestError } from '@prisma/client'

import { Config } from '../config/config'
import { Token } from '../models/token.model'
import { JwtDto } from '../resolvers/auth/dto/jwt.dto'
import { SignupInput } from '../resolvers/auth/dto/signup.input'

import { PasswordService } from './password.service'
import { PrismaService } from './prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly config: Config,
  ) {}

  async createUser(payload: SignupInput): Promise<Token> {
    const hashedPassword = await this.passwordService.hashPassword(payload.password)

    try {
      const user = await this.prisma.user.create({
        data: {
          ...payload,
          password: hashedPassword,
          role: 'USER',
        },
      })

      return this.generateToken({ userId: user.id })
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException(`Email ${payload.email} already used.`)
      } else {
        throw new Error(e)
      }
    }
  }

  async login(email: string, password: string): Promise<Token> {
    const user = await this.prisma.user.findOne({ where: { email } })

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`)
    }

    const passwordValid = await this.passwordService.validatePassword(password, user.password)

    if (!passwordValid) {
      throw new BadRequestException('Invalid password')
    }

    return this.generateToken({
      userId: user.id,
    })
  }

  async validateUser(userId: string): Promise<User | null> {
    return this.prisma.user.findOne({ where: { id: userId } })
  }

  async getUserFromToken(token: string): Promise<User | null> {
    const jwt = this.jwtService.decode(token) as JwtDto

    if (!jwt?.userId) return null

    return this.prisma.user.findOne({ where: { id: jwt.userId } })
  }

  generateToken(payload: JwtDto): Token {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.config.security.expiresIn,
    })

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.config.security.refreshIn,
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
