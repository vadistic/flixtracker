import { Catch, ConflictException, ExceptionFilter } from '@nestjs/common'
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client'

import { Config } from '../config/config'

import { PRISMA_ERROR } from './prisma.errors'

@Catch(PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientValidationError)
export class PrismaExceptionFilter implements ExceptionFilter {
  constructor(readonly config: Config) {}

  catch(error: Error) {
    if (this.config.nest.dev) {
      throw error
    }

    throw new ConflictException(PRISMA_ERROR.CONFLICT)
  }
}
