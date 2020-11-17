import { ArgsType, Int } from '@nestjs/graphql'
import { IsString, Max, Min } from 'class-validator'

import { ModelField } from '../base/field.decorator'

@ArgsType()
export class PaginationArgs {
  @ModelField(() => Int, { nullable: true })
  skip?: number

  @Min(1)
  @Max(100)
  @ModelField(() => Int, { nullable: true })
  take?: number

  @IsString()
  @ModelField(() => String, { nullable: true })
  cursor?: string
}
