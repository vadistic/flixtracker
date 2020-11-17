import { ServiceUnavailableException } from '@nestjs/common'

export const OMDB_ERROR = {
  UNAVALIBLE: () => new ServiceUnavailableException('OMDB API is Unavalible'),
}
