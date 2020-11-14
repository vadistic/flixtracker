import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { Config } from './config/config'

export function setupSwagger(config: Config, app: INestApplication) {
  if (config.swagger.enabled) {
    const options = new DocumentBuilder()
      .setTitle(config.swagger.title || 'Nestjs')
      .setDescription(config.swagger.description || 'The nestjs API description')
      .setVersion(config.swagger.version || '1.0')
      .build()

    const document = SwaggerModule.createDocument(app, options)

    SwaggerModule.setup(config.swagger.path || 'api', app, document)
  }
}
