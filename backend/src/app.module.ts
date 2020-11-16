import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import { DateTimeScalar } from './common/scalars/date-time.scalar'
import { DemoModule } from './feature/demo/demo.module'
import { PostModule } from './feature/post/post.module'
import { UserModule } from './feature/user/user.module'
import { GraphqlOptions } from './graphql'
import { AuthModule } from './module/auth/auth.module'
import { ConfigModule } from './module/config/config.module'

@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRootAsync({
      useClass: GraphqlOptions,
    }),
    AuthModule,
    UserModule,
    PostModule,
    DemoModule,
  ],
  controllers: [],
  providers: [DateTimeScalar],
})
export class AppModule {}
