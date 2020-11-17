import { Test, TestingModule } from '@nestjs/testing'
import dotenv from 'dotenv'

import { ConfigModule } from '../src/module/config/config.module'

import { UtilModule } from './utils/util.module'

dotenv.config({ path: '.env.test' })
dotenv.config({ path: '.env' })

export let utilModule: TestingModule = null as any

beforeAll(async () => {
  utilModule = await Test.createTestingModule({
    imports: [UtilModule, ConfigModule],
  }).compile()

  await utilModule.init()
}, 300000)

afterAll(async () => {
  await utilModule.close()
}, 300000)
