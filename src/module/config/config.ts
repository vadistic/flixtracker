/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Type } from 'class-transformer'
import { IsBoolean, IsOptional, IsPort, IsUrl } from 'class-validator'

import { toInt } from './config.utils'

const IS_DEV = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export class NestConfig {
  @IsUrl()
  url: string = process.env.URL ?? `http://localhost:${process.env.PORT ?? 3000}`

  @IsPort()
  port: number = toInt(process.env.PORT) ?? 3000
}

export class CorsConfig {
  @IsBoolean()
  enabled: boolean = true
}

export class DatabaseConfig {
  user: string = process.env.DB_USER ?? 'postgres'
  pasword: string = process.env.DB_PASSWORD ?? 'postgres'
  name: string = process.env.DB_NAME ?? 'dev'
  host: string = process.env.DB_HOST ?? 'localhost'

  @IsOptional()
  schema: string = process.env.DB_SCHEMA ?? 'public'

  @IsPort()
  port: number = toInt(process.env.DB_PORT) ?? 5432
}

export class SwaggerConfig {
  enabled: boolean = true
  title: string = 'NestJS API'
  description: string = 'The nestjs API description'
  version: string = '1.0.0'
  path: string = 'api'
}

export class GraphqlConfig {
  playgroundEnabled: boolean = true
  debug: boolean = IS_DEV
  schemaDestination: string = './src/schema.graphql'
  sortSchema: boolean = true
}

export class SecurityConfig {
  expiresIn: string = IS_DEV ? '1d' : '2m'
  refreshIn: string = '7d'
  bcryptSaltOrRound: string | number = 10

  jwtSecret: string = process.env.JWT_SECRET ?? 'mySecret'

  googleClient: string = process.env.OAUTH_GOOGLE_CLIENT!
  googleSecret: string = process.env.OAUTH_GOOGLE_SECRET!
}

// ────────────────────────────────────────────────────────────────────────────────

export class Config {
  @Type(() => NestConfig)
  nest: NestConfig

  @Type(() => CorsConfig)
  cors: CorsConfig

  @Type(() => SwaggerConfig)
  swagger: SwaggerConfig

  @Type(() => GraphqlConfig)
  graphql: GraphqlConfig

  @Type(() => SecurityConfig)
  security: SecurityConfig

  @Type(() => DatabaseConfig)
  database: DatabaseConfig
}

export const configuration = (): Config => ({
  nest: new NestConfig(),
  cors: new CorsConfig(),
  swagger: new SwaggerConfig(),
  graphql: new GraphqlConfig(),
  security: new SecurityConfig(),
  database: new DatabaseConfig(),
})
