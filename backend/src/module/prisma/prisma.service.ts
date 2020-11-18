/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

import { Config } from '../config/config'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(readonly config: Config) {
    super({ datasources: { db: { url: buildPrismaUrl(config) } } })

    this.$use(async (params, next) => {
      const args = stripNullsFromArgs(params.args)
      return next({ ...params, args })
    })
  }

  get $URL() {
    return buildPrismaUrl(this.config)
  }

  get $SCHEMA() {
    return this.config.database.schema
  }

  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}

export const buildPrismaUrl = (config: Config) =>
  `postgresql://${config.database.user}:${config.database.pasword}` +
  `@${config.database.host}:${config.database.port}/` +
  `${config.database.name}?schema=${config.database.schema}&sslmode=prefer`

/** temp solution for nulls in graphql requests */
export const stripNullsFromArgs = (args: any) => {
  if (!args || typeof args !== 'object') return args

  const res: any = {}

  for (const key of Object.keys(args)) {
    const val = args[key]

    if (val !== undefined && val !== null) {
      res[key] = args[key]
      continue
    }

    // deep for where (but just one level)
    if (key === 'where') {
      res[key] = stripNullsFromArgs(val)
      continue
    }
  }

  return res
}
