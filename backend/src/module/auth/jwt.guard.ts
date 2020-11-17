import {
  Injectable,
  ExecutionContext,
  InternalServerErrorException,
  ContextType,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

import { Context } from '../../graphql'

import { AUTH_ERROR } from './auth.error'

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  getRequest(ctx: ExecutionContext) {
    const type = ctx.getType<ContextType | 'graphql'>()

    if (type === 'graphql') {
      return GqlExecutionContext.create(ctx).getContext<Context>().req
    }

    if (type === 'http') {
      return ctx.switchToHttp().getRequest<Request>()
    }

    throw new InternalServerErrorException(AUTH_ERROR.UNSUPPRTED_CONTEXT)
  }
}
