import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

import { Config } from '../../config/config'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(readonly config: Config) {
    super({
      datasources: {
        db: {
          url:
            `postgresql://${config.database.user}:${config.database.pasword}` +
            `@${config.database.host}:${config.database.port}/` +
            `${config.database.name}?schema=${config.database.schema}&sslmode=prefer`,
        },
      },
    })
  }

  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
