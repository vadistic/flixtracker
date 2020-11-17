import { ConflictException, NotFoundException } from '@nestjs/common'

export const MOVIE_ERROR = {
  NOT_ON_OMDB: () => new NotFoundException('Movie not found in omdb'),

  ALREADY_PRESENT: () => new ConflictException('Movie already present'),
}
