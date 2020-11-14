import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { Request } from 'express'

import { DateScalar } from './common/scalars/date.scalar'
import { Config, configuration } from './config/config'
import { ConfigModule } from './config/config.module'
import { Context } from './context'
import { AppController } from './controllers/app.controller'
import { AppResolver } from './resolvers/app.resolver'
import { AuthModule } from './resolvers/auth/auth.module'
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
      inject: [Config],
      useFactory: (config: Config) => {
        return {
          buildSchemaOptions: {
            numberScalarMode: 'integer',
            dateScalarMode: 'isoDate',
          },
          sortSchema: config.graphql.sortSchema,
          autoSchemaFile: config.graphql.schemaDestination,
          debug: config.graphql.debug,
          playground: config.graphql.playgroundEnabled,
          context: ({ req }): Context => ({ req: req as Request }),
        }
      },
    }),
    AuthModule,
    UserModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver, DateScalar],
})
export class AppModule {}
