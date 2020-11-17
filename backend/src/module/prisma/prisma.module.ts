import { Module } from '@nestjs/common'

import { PrismaExceptionFilter } from './prisma-exception.filter'
import { PrismaService } from './prisma.service'

@Module({
  providers: [PrismaService, PrismaExceptionFilter],
  exports: [PrismaService, PrismaExceptionFilter],
})
export class PrismaModule {}
