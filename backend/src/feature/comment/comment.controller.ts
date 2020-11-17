import { Body, Controller, Get, Query, Post, Param, UseGuards, Patch, Delete } from '@nestjs/common'
import { ApiBody, ApiOkResponse } from '@nestjs/swagger'

import { JwtGuard } from '../../module/auth/jwt.guard'
import { CtxUser } from '../../module/auth/user.decorator'
import { MovieIdInput } from '../movie/dto/movie-id.input'

import { CommentService } from './comment.service'
import { CommentCreateDto } from './dto/comment-create.dto'
import { CommentFilterDto } from './dto/comment-filter.dto'
import { CommentIdInput } from './dto/comment-id.input'
import { CommentUpdateDto } from './dto/comment-update.dto'
import { CommentModel } from './dto/comment.model'

@Controller('/api')
export class CommentController {
  constructor(readonly commentService: CommentService) {}

  @Get('/movies/:movieId/comments')
  @ApiOkResponse({
    type: CommentModel,
    isArray: true,
  })
  async getComments(@Query() filter: CommentFilterDto, @Param() { movieId }: MovieIdInput) {
    return this.commentService.findManyComments({ ...filter, movieId })
  }

  @Post('/movies/:movieId/comments')
  @ApiBody({ type: CommentCreateDto })
  @ApiOkResponse({
    type: CommentModel,
  })
  @UseGuards(JwtGuard)
  async postComment(@Body() data: CommentCreateDto, @CtxUser() user: CtxUser) {
    return this.commentService.createComment({ ...data, userId: user.id })
  }

  // ────────────────────────────────────────────────────────────────────────────────

  @Get('/comments/:commentId')
  @ApiOkResponse({
    type: CommentModel,
    isArray: true,
  })
  async getComment(@Param() { commentId }: CommentIdInput) {
    return this.commentService.findOneComment({ commentId })
  }

  @Patch('/comments/:commentId')
  @ApiBody({ type: CommentUpdateDto })
  @ApiOkResponse({
    type: CommentModel,
  })
  @UseGuards(JwtGuard)
  async patchComment(
    @Param() { commentId }: CommentIdInput,
    @Body() data: CommentUpdateDto,
    @CtxUser() user: CtxUser,
  ) {
    return this.commentService.updateComment({ ...data, userId: user.id, commentId })
  }

  @Delete('/comments/:commentId')
  @ApiOkResponse({
    type: CommentModel,
  })
  @UseGuards(JwtGuard)
  async deleteComment(@Param() { commentId }: CommentIdInput, @CtxUser() user: CtxUser) {
    return this.commentService.deleteComment({ userId: user.id, commentId })
  }
}
