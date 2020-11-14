import { DynamicModule, InternalServerErrorException, Type } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validateSync } from 'class-validator'
import dotenv from 'dotenv'

export interface ConfigModuleOptions {
  type: () => Type<any>
  load: () => any
  envFile?: string
  enableEnvFile?: boolean
  isGlobal?: boolean
}

export class ConfigModule {
  static forRoot(options: ConfigModuleOptions): DynamicModule {
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
      module: ConfigModule,
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
