import { PartialType } from '@nestjs/swagger'

import { MovieCreateDto } from './movie-create.dto'

export class MovieUpdateDto extends PartialType(MovieCreateDto) {}
