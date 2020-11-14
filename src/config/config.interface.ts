export interface Config {
  nest: NestConfig
  cors: CorsConfig
  swagger: SwaggerConfig
  graphql: GraphqlConfig
  security: SecurityConfig
  database: DatabaseConfig
}

export interface DatabaseConfig {
  DB_USER: string
  DB_PASSWORD: string
  DB_NAME: string
  DB_HOST: string
  DB_PORT: number
  DB_SCHEMA?: string
}

export interface NestConfig {
  port: number
}

export interface CorsConfig {
  enabled: boolean
}

export interface SwaggerConfig {
  enabled: boolean
  title: string
  description: string
  version: string
  path: string
}

export interface GraphqlConfig {
  playgroundEnabled: boolean
  debug: boolean
  schemaDestination: string
  sortSchema: boolean
}

export interface SecurityConfig {
  expiresIn: string
  refreshIn: string
  bcryptSaltOrRound: string | number
  jwtSecret: string
}
