import { Test, TestingModule } from '@nestjs/testing'

import { Config, configuration } from './config'
import { ConfigModule } from './config.module'

describe('ConfigModule', () => {
  let config: Config

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          type: () => Config,
          load: configuration,
          isGlobal: true,
          envFile: '.env',
        }),
      ],
    }).compile()

    config = app.get<Config>(Config)
  })

  it('works', () => {
    expect(config).toBeDefined()
    expect(typeof config.nest.port).toBe('number')
  })
})
