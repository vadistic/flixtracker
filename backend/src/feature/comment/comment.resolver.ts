import { UseGuards } from '@nestjs/common'
import { Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql'
import { Resolver } from '@nestjs/graphql'
import { Comment } from '@prisma/client'

import { JwtGuard } from '../../module/auth/jwt.guard'
import { CtxUser } from '../../module/auth/user.decorator'
import { PrismaService } from '../../module/prisma/prisma.service'
import { MovieModel } from '../movie/dto/movie.model'

import { CommentService } from './comment.service'
import { CommentCreateInput } from './dto/comment-create.input'
import { CommentIdInput } from './dto/comment-id.input'
import { CommentUpdateInput } from './dto/comment-update.input'
import { CommentQueryArgs } from './dto/comment.args'
import { CommentModel } from './dto/comment.model'

@Resolver(() => CommentModel)
export class CommentResolver {
  constructor(readonly commentService: CommentService, readonly prisma: PrismaService) {}

  @Query(returns => [CommentModel])
  async comments(@Args() { where, ...rest }: CommentQueryArgs) {
    return this.commentService.findManyComments({ ...where, ...rest })
  }

  @Query(returns => CommentModel, { nullable: true })
  async comment(@Args('where') where: CommentIdInput) {
    return this.commentService.findOneComment(where)
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

  // ────────────────────────────────────────────────────────────────────────────────

  @ResolveField(type => MovieModel)
  async movie(@Parent() comment: Comment) {
    return this.commentService.getRelatedMovie(comment)
  }
}
