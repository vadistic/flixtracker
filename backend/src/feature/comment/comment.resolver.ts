import { UseGuards } from '@nestjs/common'
import { Query, Args, Mutation } from '@nestjs/graphql'
import { Resolver } from '@nestjs/graphql'

import { JwtGuard } from '../../module/auth/jwt.guard'
import { CtxUser } from '../../module/auth/user.decorator'

import { CommentService } from './comment.service'
import { CommentCreateInput } from './dto/comment-create.input'
import { CommentFilterInput } from './dto/comment-filter.input'
import { CommentIdInput } from './dto/comment-id.input'
import { CommentUpdateInput } from './dto/comment-update.input'
import { CommentModel } from './dto/comment.model'

@Resolver(() => CommentModel)
export class CommentResolver {
  constructor(readonly commentService: CommentService) {}

  @Query(returns => [CommentModel])
  async comments(@Args('where', { nullable: true }) where: CommentFilterInput = {}) {
    return this.commentService.getComments(where)
  }

  @Query(returns => CommentModel, { nullable: true })
  async comment(@Args('where') where: CommentIdInput) {
    return this.commentService.getComment(where)
  }

  @Mutation(returns => CommentModel, { nullable: true })
  @UseGuards(JwtGuard)
  async createComment(@Args('data') data: CommentCreateInput, @CtxUser() user: CtxUser) {
    return this.commentService.createComment({ ...data, userId: user.id })
  }

  @Mutation(returns => CommentModel, { nullable: true })
  @UseGuards(JwtGuard)
  async updateComment(
    @Args('where') where: CommentIdInput,
    @Args('data') data: CommentUpdateInput,
    @CtxUser() user: CtxUser,
  ) {
    return this.commentService.updateComment({ ...data, ...where, userId: user.id })
  }

  @Mutation(returns => CommentModel, { nullable: true })
  @UseGuards(JwtGuard)
  async deleteComment(@Args('where') where: CommentIdInput, @CtxUser() user: CtxUser) {
    return this.commentService.deleteComment({ ...where, userId: user.id })
  }
}
