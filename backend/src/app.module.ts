import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

import { DateTimeScalar } from './common/scalars/date-time.scalar'
import { DemoModule } from './feature/demo/demo.module'
import { MovieModule } from './feature/movie/movie.module'
import { UserModule } from './feature/user/user.module'
import { GraphqlOptions } from './graphql'
import { AuthModule } from './module/auth/auth.module'
import { ConfigModule } from './module/config/config.module'
import { OmdbModule } from './module/omdb/omdb.module'
import { PrismaModule } from './module/prisma/prisma.module'

@Module({
  imports: [
    ConfigModule,
    OmdbModule,
    PrismaModule,

    GraphQLModule.forRootAsync({
      useClass: GraphqlOptions,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../app/build'),
      renderPath: '/',
      exclude: ['auth', 'api', 'graphql'],
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
