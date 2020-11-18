/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'

import { toBool, toInt } from './config.utils'

const IS_DEV = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export class NestConfig {
  dev: boolean = IS_DEV

  @IsString()
  url: string = process.env.URL ?? `http://localhost:${process.env.PORT ?? 3000}`

  @IsNumber()
  port: number = toInt(process.env.PORT) ?? 3000

  corsEnabled: boolean = true
  cookiesEnabled: boolean = true
}

export class SmtpConfig {
  @IsNumber()
  port: number = toInt(process.env.SMTP_PORT) ?? 1025
  host: string = process.env.SMTP_HOST ?? 'localhost'
  username: string = process.env.SMTP_USERNAME ?? 'localhost'
  password: string = process.env.SMTP_PASSWORD ?? 'localhost'
  tls: boolean = toBool(process.env.SMTP_TLS) ?? false
  sender: string = process.env.SMTP_SENDER ?? 'NestJS App'
  email: string = process.env.SMTP_EMAIL ?? 'mail@example.com'

  retries: number = 5
}

export class DatabaseConfig {
  user: string = process.env.DB_USER ?? 'postgres'
  pasword: string = process.env.DB_PASSWORD ?? 'postgres'
  name: string = process.env.DB_NAME ?? 'dev'
  host: string = process.env.DB_HOST ?? 'localhost'

  @IsOptional()
  schema: string = process.env.DB_SCHEMA ?? 'public'

  @IsNumber()
  port: number = toInt(process.env.DB_PORT) ?? 5432
}

export class SwaggerConfig {
  enabled: boolean = true
  title: string = 'Flixtracker API'
  description: string = 'The FlixTracker REST API documentation'
  version: string = '0.1.0'
  path: string = 'api'
}

export class GraphqlConfig {
  playgroundEnabled: boolean = true
  introspectionEnabled: boolean = true
  debug: boolean = IS_DEV
}

export class AuthConfig {
  expiresIn: string = IS_DEV ? '1d' : '2m'
  refreshIn: string = '7d'

  bcryptSaltOrRound: string | number = 10

  jwtSecret: string = process.env.JWT_SECRET ?? 'mySecret'

  @IsString()
  googleClient: string = process.env.OAUTH_GOOGLE_CLIENT!

  @IsString()
  googleSecret: string = process.env.OAUTH_GOOGLE_SECRET!
}

export class OmdbConfig {
  @IsString()
  apikey: string = process.env.OMDB_KEY!
}

// ────────────────────────────────────────────────────────────────────────────────

export class Config {
  @ValidateNested()
  @Type(() => NestConfig)
  nest: NestConfig

  @ValidateNested()
  @Type(() => SmtpConfig)
  smtp: SmtpConfig

  @ValidateNested()
  @Type(() => SwaggerConfig)
  swagger: SwaggerConfig

  @ValidateNested()
  @Type(() => GraphqlConfig)
  graphql: GraphqlConfig

  @ValidateNested()
  @Type(() => AuthConfig)
  auth: AuthConfig

  @ValidateNested()
  @Type(() => DatabaseConfig)
  database: DatabaseConfig

  @ValidateNested()
  @Type(() => OmdbConfig)
  omdb: OmdbConfig
}

export const configuration = (): Config => ({
  nest: new NestConfig(),
  smtp: new SmtpConfig(),
  swagger: new SwaggerConfig(),
  graphql: new GraphqlConfig(),
  auth: new AuthConfig(),
  database: new DatabaseConfig(),
  omdb: new OmdbConfig(),
})
