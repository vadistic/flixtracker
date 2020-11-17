import {
  ContextType,
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { User } from '@prisma/client'
import { Request } from 'express'

import { Context } from '../../graphql'

export const CtxUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const type = ctx.getType<ContextType | 'graphql'>()

  if (type === 'graphql') {
    return GqlExecutionContext.create(ctx).getContext<Context>().req.user
  }

  if (type === 'http') {
    return ctx.switchToHttp().getRequest<Request>().user
  }

  throw new InternalServerErrorException('Unsuported execution context type : ' + type)
})

export type CtxUser = User
