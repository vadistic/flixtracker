import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import { DateScalar } from './common/scalars/date.scalar'
import { Config, configuration } from './config/config'
import { ConfigModule } from './config/config.module'
import { AppController } from './controllers/app.controller'
import { GraphqlOptions } from './graphql'
import { AuthModule } from './module/auth/auth.module'
import { AppResolver } from './resolvers/app.resolver'
import { PostModule } from './resolvers/post/post.module'
import { UserModule } from './resolvers/user/user.module'
import { AppService } from './services/app.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configuration,
      type: () => Config,
      envFile: '.env',
      enableEnvFile: process.env.NODE_ENV !== 'production',
    }),
    GraphQLModule.forRootAsync({
      useClass: GraphqlOptions,
    }),
    AuthModule,
    UserModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver, DateScalar],
})
export class AppModule {}
