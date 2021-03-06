import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { authenticate } from 'passport'

import { Config } from '../config/config'
import { MailModule } from '../mail/mail.module'
import { PrismaModule } from '../prisma/prisma.module'

import { AuthController } from './auth.controller'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtGuard } from './jwt.guard'
import { PasswordService } from './password.service'
import { GoogleStrategy } from './strategy/google.strategy'
import { JwtStrategy } from './strategy/jwt.strategy'

@Module({
  imports: [
    PrismaModule,
    MailModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [Config],
      useFactory: (config: Config) => {
        return {
          secret: config.auth.jwtSecret,
          signOptions: {
            expiresIn: config.auth.expiresIn,
          },
        }
      },
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy, GoogleStrategy, JwtGuard, PasswordService],
  controllers: [AuthController],
  exports: [JwtGuard],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        authenticate('google', {
          session: false,
          scope: ['email', 'profile'],
        }),
      )
      .forRoutes('/auth/google')
  }
}
