export interface JwtDto {
  userId: string
}

export class TokensDto {
  accessToken: string
  refreshToken: string
  payload: JwtDto
}
