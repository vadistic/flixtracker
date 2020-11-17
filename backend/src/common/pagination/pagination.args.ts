import { ArgsType } from '@nestjs/graphql'

@ArgsType()
export class PaginationArgs {
  skip?: number

  take?: number

  cursor?: string
}
