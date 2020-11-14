import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { Config } from '../../config/config'
import { GqlAuthGuard } from '../../guards/gql-auth.guard'
import { AuthService } from '../../services/auth.service'
import { PasswordService } from '../../services/password.service'
import { PrismaService } from '../../services/prisma.service'

import { AuthResolver } from './auth.resolver'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [Config],
      useFactory: (config: Config) => {
        return {
          secret: config.security.jwtSecret,
          signOptions: {
            expiresIn: config.security.expiresIn,
          },
        }
      },
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy, GqlAuthGuard, PasswordService, PrismaService],
  exports: [GqlAuthGuard],
})
export class AuthModule {}
