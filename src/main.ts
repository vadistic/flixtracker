import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'

import { AppModule } from './app.module'
import { Config } from './module/config/config'
import { setupSwagger } from './swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // validation
  app.useGlobalPipes(new ValidationPipe())

  const config = app.get(Config)

  setupSwagger(config, app)

  // cors
  if (config.cors.enabled) {
    app.enableCors()
  }

  if (config.cookie.enabled) {
    app.use(cookieParser())
  }

  await app.listen(config.nest.port)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
