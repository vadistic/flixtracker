import { Injectable, UseFilters } from '@nestjs/common'

import { OrderDirection } from '../../common/order/order-direction'
import { PrismaExceptionFilter } from '../../module/prisma/prisma-exception.filter'
import { PrismaService } from '../../module/prisma/prisma.service'
import { MovieIdInput } from '../movie/dto/movie-id.input'
import { UserIdInput } from '../user/dto/user-id.input'

import { COMMENT_ERROR } from './comment.error'
import { CommentCreateDto } from './dto/comment-create.dto'
import { CommentCreateInput } from './dto/comment-create.input'
import { CommentFilterDto } from './dto/comment-filter.dto'
import { CommentFilterInput } from './dto/comment-filter.input'
import { CommentIdInput } from './dto/comment-id.input'
import { CommentOrderBy } from './dto/comment-order.input'
import { CommentUpdateDto } from './dto/comment-update.dto'
import { CommentUpdateInput } from './dto/comment-update.input'

@Injectable()
@UseFilters(PrismaExceptionFilter)
export class CommentService {
  constructor(readonly prisma: PrismaService) {}

  async findManyComments({
    movieId,
    cursor,
    direction = OrderDirection.desc,
    orderBy = CommentOrderBy.createdAt,
    skip,
    take,
    content,
  }: CommentFilterInput & CommentFilterDto) {
    return await this.prisma.comment.findMany({
      where: {
        movieId,
        content: { contains: content },
      },
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { [orderBy]: direction },
      skip,
      take,
    })
  }

  async findOneComment({ commentId }: CommentIdInput) {
    return await this.prisma.comment.findOne({ where: { id: commentId } })
  }

  async createComment({
    movieId,
    userId,
    ...data
  }: MovieIdInput & UserIdInput & CommentCreateInput & CommentCreateDto) {
    return await this.prisma.comment.create({
      data: {
        ...data,
        movie: { connect: { id: movieId } },
        author: { connect: { id: userId } },
      },
    })
  }

  async updateComment({
    commentId,
    userId,
    ...data
  }: CommentIdInput & UserIdInput & CommentUpdateInput & CommentUpdateDto) {
    const comment = await this.prisma.comment.findOne({ where: { id: commentId } })

    if (!comment) {
      throw COMMENT_ERROR.NOT_FOUND()
    }

    if (comment.authorId !== userId) {
      throw COMMENT_ERROR.NOT_OWNER()
    }

    return await this.prisma.comment.update({
      where: { id: commentId },
      data: data,
    })
  }

  async deleteComment({ commentId, userId }: CommentIdInput & UserIdInput) {
    const comment = await this.prisma.comment.findFirst({ where: { id: commentId } })

    if (!comment) {
      throw COMMENT_ERROR.NOT_FOUND()
    }

    if (comment.authorId !== userId) {
      throw COMMENT_ERROR.NOT_OWNER()
    }

    return await this.prisma.comment.delete({
      where: { id: commentId },
    })
  }
}
