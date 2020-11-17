import { Test, TestingModule } from '@nestjs/testing'

import { ConfigModule } from '../../module/config/config.module'

import { MovieModule } from './movie.module'
import { MovieService } from './movie.service'

describe('MovieService', () => {
  let service: MovieService
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [MovieModule, ConfigModule],
    }).compile()

    service = app.get(MovieService)
  })

  afterAll(async () => {
    await app.close()
  })

  describe('basic', () => {
    it('should be defined', () => {
      expect(service).toBeDefined()
    })
  })

  // describe('firn one', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(resolver.helloWorld()).toBe('Hello World!')
  //   })
  // })

  // describe('hello', () => {
  //   it('should return "Hello ${name}!"', () => {
  //     const name = chance.name()
  //     expect(resolver.hello(name)).toBe(`Hello ${name}!`)
  //   })
  // })
})
