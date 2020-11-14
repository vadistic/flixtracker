import { DynamicModule, InternalServerErrorException, Type, Module } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validateSync } from 'class-validator'
import dotenv from 'dotenv'

import { Config, configuration } from './config'

export interface ConfigurationModuleOptions {
  type: () => Type<any>
  load: () => any
  envFile?: string
  enableEnvFile?: boolean
  isGlobal?: boolean
}

export class ConfigurationModule {
  static forRoot(options: ConfigurationModuleOptions): DynamicModule {
    if (options.enableEnvFile !== false) {
      dotenv.config({ path: options.envFile ?? '.env' })
    }

    const classRef = options.type()

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const clz: Type<any> = plainToClass(classRef, options.load(), {
      enableImplicitConversion: true,
      strategy: 'exposeAll',
    })

    const err = validateSync(clz)

    if (err.length > 0) throw new InternalServerErrorException(err[0], 'invalid config')

    return {
      module: ConfigurationModule,
      global: options.isGlobal ?? true,
      providers: [
        {
          provide: classRef,
          useValue: clz,
        },
      ],
      exports: [classRef],
    }
  }
}

@Module({
  imports: [
    ConfigurationModule.forRoot({
      isGlobal: true,
      load: configuration,
      type: () => Config,
      envFile: '.env',
      enableEnvFile: process.env.NODE_ENV !== 'production',
    }),
  ],
})
export class ConfigModule {}
