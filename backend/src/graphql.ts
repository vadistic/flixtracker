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
      autoSchemaFile: this.config.nest.dev && join(__dirname, 'schema.graphql'),
      debug: this.config.graphql.debug,
      playground: this.config.graphql.playgroundEnabled,
      context: ({ req }): Context => ({ req: req as Request }),
    }
  }
}
