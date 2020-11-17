import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import { DateTimeScalar } from './common/scalars/date-time.scalar'
import { DemoModule } from './feature/demo/demo.module'
import { MovieModule } from './feature/movie/movie.module'
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
    DemoModule,
    MovieModule,
  ],
  controllers: [],
  providers: [DateTimeScalar],
})
export class AppModule {}
