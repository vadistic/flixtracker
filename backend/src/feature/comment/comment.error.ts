import { ForbiddenException, NotFoundException } from '@nestjs/common'

export const COMMENT_ERROR = {
  // 401 - Forbidden
  NOT_OWNER: () => new ForbiddenException('Comment does not belong to current user'),

  // 404 - Not found
  NOT_FOUND: () => new NotFoundException('Commment not found'),
}
