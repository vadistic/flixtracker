import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { Config } from './config/config'
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

  await app.listen(config.nest.port)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
