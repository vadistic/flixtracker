import { PartialType } from '@nestjs/graphql'

import { MovieCreateInput } from './movie-create.input'

export class MovieUpdateInput extends PartialType(MovieCreateInput) {}
