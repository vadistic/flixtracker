import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { SecurityConfig } from 'src/configs/config.interface'

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
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security')
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: securityConfig.expiresIn,
          },
        }
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy, GqlAuthGuard, PasswordService, PrismaService],
  exports: [GqlAuthGuard],
})
export class AuthModule {}
