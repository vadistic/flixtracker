import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { authenticate } from 'passport'

import { Config } from '../config/config'
import { PrismaModule } from '../prisma/prisma.module'

import { AuthController } from './auth.controller'
import { GqlAuthGuard } from './auth.guard'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { GoogleStrategy } from './google.strategy'
import { JwtStrategy } from './jwt.strategy'
import { PasswordService } from './password.service'

@Module({
  imports: [
    PrismaModule,
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
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    GoogleStrategy,
    GqlAuthGuard,
    PasswordService,
  ],
  controllers: [AuthController],
  exports: [GqlAuthGuard],
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
