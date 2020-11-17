import { InputType, PartialType } from '@nestjs/graphql'

import { MovieCreateInput } from './movie-create.input'

@InputType()
export class MovieUpdateInput extends PartialType(MovieCreateInput) {}
