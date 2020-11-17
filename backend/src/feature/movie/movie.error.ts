import { ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common'

export const MOVIE_ERROR = {
  NOT_ON_OMDB: () => new ForbiddenException('Movie not on omdb'),

  ALREADY_PRESENT: () => new ConflictException('Movie already exists'),

  NOT_FOUND: () => new NotFoundException('Movie not found'),
}
