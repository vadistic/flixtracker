import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import { DateScalar } from './common/scalars/date.scalar'
import { ConfigModule } from './module/config/config.module'
import { DemoModule } from './feature/demo/demo.module'
import { PostModule } from './feature/post/post.module'
import { UserModule } from './feature/user/user.module'
import { GraphqlOptions } from './graphql'
import { AuthModule } from './module/auth/auth.module'
import { Config, configuration } from './module/config/config'

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
    DemoModule,
  ],
  controllers: [],
  providers: [DateScalar],
})
export class AppModule {}
