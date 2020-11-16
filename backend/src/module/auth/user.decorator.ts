import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { User } from '@prisma/client'

import { Context } from '../../graphql'

export const CtxUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) =>
    GqlExecutionContext.create(ctx).getContext<Context>().req.user,
)

export type CtxUser = User
