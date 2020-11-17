import { Injectable } from '@nestjs/common'
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql'
import { Request } from 'express'
import { join } from 'path'

import { Config } from './module/config/config'

export interface Context {
  req: Request
}

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  constructor(readonly config: Config) {}

  createGqlOptions(): GqlModuleOptions {
    return {
      buildSchemaOptions: {
        numberScalarMode: 'integer',
        dateScalarMode: 'isoDate',
      },
      sortSchema: true,
      autoSchemaFile: join(__dirname, '../schema.graphql'),
      debug: this.config.graphql.debug,
      playground: this.config.graphql.playgroundEnabled,
      introspection: this.config.graphql.introspectionEnabled,
      path: '/graphql',
      context: ({ req }): Context => ({ req: req as Request }),
    }
  }
}
