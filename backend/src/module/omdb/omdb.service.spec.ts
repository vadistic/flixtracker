import { Test, TestingModule } from '@nestjs/testing'

import { OmdbModule } from './omdb.module'
import { OmdbService } from './omdb.service'

describe('OmdbService', () => {
  let service: OmdbService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OmdbModule],
    }).compile()

    service = module.get<OmdbService>(OmdbService)
  })

  it(`should be defined`, () => {
    expect(service).toBeDefined()
  })

  it(`should find 'Kill Bill'`, async () => {
    const res = await service.fetchOne({ t: 'Kill Bill' })

    expect(res).toBeDefined()
    expect(res?.Title).toMatch('Kill Bill')
  })
})
