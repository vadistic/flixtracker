import { Test, TestingModule } from '@nestjs/testing'
import { Chance } from 'chance'

import { DemoResolver } from './demo.resolver'
import { DemoService } from './demo.service'

const chance = new Chance()

describe('DemoResolver', () => {
  let resolver: DemoResolver

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [DemoResolver, DemoService],
    }).compile()

    resolver = app.get<DemoResolver>(DemoResolver)
  })

  describe('helloWorld', () => {
    it('should return "Hello World!"', () => {
      expect(resolver.helloWorld()).toBe('Hello World!')
    })
  })

  describe('hello', () => {
    it('should return "Hello ${name}!"', () => {
      const name = chance.name()
      expect(resolver.hello(name)).toBe(`Hello ${name}!`)
    })
  })
})
