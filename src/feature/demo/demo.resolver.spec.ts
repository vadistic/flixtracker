import { Test, TestingModule } from '@nestjs/testing'
import { Chance } from 'chance'

import { DemoResolver } from './demo.resolver'
import { DemoService } from './demo.service'

const chance = new Chance()

describe('DemoResolver', () => {
  let appResolver: DemoResolver

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [DemoResolver, DemoService],
    }).compile()

    appResolver = app.get<DemoResolver>(DemoResolver)
  })

  describe('helloWorld', () => {
    it('should return "Hello World!"', () => {
      expect(appResolver.helloWorld()).toBe('Hello World!')
    })
  })

  describe('hello', () => {
    it('should return "Hello ${name}!"', () => {
      const name = chance.name()
      expect(appResolver.hello(name)).toBe(`Hello ${name}!`)
    })
  })
})
