import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { Config } from './module/config/config'

export function setupSwagger(config: Config, app: INestApplication) {
  const url = config.nest.dev ? 'http' : 'https'

  if (config.swagger.enabled) {
    const options = new DocumentBuilder()
      .setTitle(config.swagger.title)
      .setDescription(config.swagger.description)
      .setVersion(config.swagger.version || '1.0.0')
      .setContact('Jakub Wadas', 'https://vadistic.netlify.app', 'vadistic@gmail.com')
      .addServer(`${url}://`)
      .build()

    const document = SwaggerModule.createDocument(app, options)

    SwaggerModule.setup(config.swagger.path || 'api', app, document)
  }
}
