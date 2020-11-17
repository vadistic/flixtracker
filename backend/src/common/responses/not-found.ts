import { ApiProperty } from '@nestjs/swagger'

export class NotFoundResponse {
  @ApiProperty({ type: Number, example: 404 })
  status = 404

  @ApiProperty({ type: String, example: 'Not Found' })
  name = 'Not Found'

  @ApiProperty({ type: String })
  message!: string
}
