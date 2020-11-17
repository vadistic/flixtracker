import { Module } from '@nestjs/common'

import { PrismaModule } from '../../module/prisma/prisma.module'

import { CommentController } from './comment.controller'
import { CommentResolver } from './comment.resolver'
import { CommentService } from './comment.service'

@Module({
  imports: [PrismaModule],
  providers: [CommentService, CommentResolver],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule {}
