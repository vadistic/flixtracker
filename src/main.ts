import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'

import { AppModule } from './app.module'
import { Config } from './module/config/config'
import { setupSwagger } from './swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())

  const config = app.get(Config)

  setupSwagger(config, app)

  if (config.nest.corsEnabled) {
    app.enableCors()
  }

  if (config.nest.cookiesEnabled) {
    app.use(cookieParser())
  }

  await app.listen(config.nest.port)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
