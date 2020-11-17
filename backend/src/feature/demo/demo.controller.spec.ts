import { Test, TestingModule } from '@nestjs/testing'
import { Chance } from 'chance'

import { DemoController } from './demo.controller'
import { DemoService } from './demo.service'

const chance = new Chance()

describe('DemoController', () => {
  let appController: DemoController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DemoController],
      providers: [DemoService],
    }).compile()

    appController = app.get<DemoController>(DemoController)
  })

  describe('hello/:name', () => {
    it('should return "Hello ${name}!"', () => {
      const name = chance.name()
      expect(appController.getHelloName(name)).toBe(`Hello ${name}!`)
    })
  })
})
