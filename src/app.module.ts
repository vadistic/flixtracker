import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { Request } from 'express'

import { DateScalar } from './common/scalars/date.scalar'
import config from './configs/config'
import { GraphqlConfig } from './configs/config.interface'
import { Context } from './context'
import { AppController } from './controllers/app.controller'
import { AppResolver } from './resolvers/app.resolver'
import { AuthModule } from './resolvers/auth/auth.module'
import { PostModule } from './resolvers/post/post.module'
import { UserModule } from './resolvers/user/user.module'
import { AppService } from './services/app.service'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    GraphQLModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const graphqlConfig = configService.get<GraphqlConfig>('graphql')
        return {
          buildSchemaOptions: {
            numberScalarMode: 'integer',
            dateScalarMode: 'isoDate',
          },
          sortSchema: graphqlConfig.sortSchema,
          autoSchemaFile: graphqlConfig.schemaDestination || './src/schema.graphql',
          debug: graphqlConfig.debug,
          playground: graphqlConfig.playgroundEnabled,
          context: ({ req }): Context => ({ req: req as Request }),
        }
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver, DateScalar],
})
export class AppModule {}
