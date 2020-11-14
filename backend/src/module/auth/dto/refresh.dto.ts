import { IsNotEmpty } from 'class-validator'

export class RefreshDto {
  @IsNotEmpty()
  token: string
}
