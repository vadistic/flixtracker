/* eslint-disable jest/expect-expect */
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { Chance } from 'chance'
import request from 'supertest'

import { AppModule } from '../src/app.module'
const chance = new Chance()

describe('AppResolver (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('helloWorld (Query)', async () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: /* graphql */ `{ helloWorld }`,
      })
      .expect(200)
  })
  it('hello (Query)', async () => {
    const name = chance.name()
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: /* graphql */ `{ hello(name: "${name}") }`,
      })
      .expect(200)
  })
})
