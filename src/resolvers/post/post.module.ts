import { Module } from '@nestjs/common'

import { PrismaService } from '../../services/prisma.service'

import { PostResolver } from './post.resolver'

@Module({
  providers: [PostResolver, PrismaService],
})
export class PostModule {}
