import { Injectable } from '@nestjs/common'
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql'
import { Request } from 'express'

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
      sortSchema: this.config.graphql.sortSchema,
      autoSchemaFile: this.config.graphql.schemaDestination,
      debug: this.config.graphql.debug,
      playground: this.config.graphql.playgroundEnabled,
      context: ({ req }): Context => ({ req: req as Request }),
    }
  }
}
