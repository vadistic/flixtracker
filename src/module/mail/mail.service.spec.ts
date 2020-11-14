import { Test, TestingModule } from '@nestjs/testing'

import { ConfigModule } from '../config/config.module'

import { MailType } from './mail.interface'
import { MailModule } from './mail.module'
import { MailService } from './mail.service'

describe('MailService', () => {
  let service: MailService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [MailModule, ConfigModule],
    }).compile()

    service = app.get<MailService>(MailService)
  })

  describe('works', () => {
    it('should send "welcome mail"', async () => {
      const info = await service.sendMail(MailType.WELCOME, {
        name: 'Jakub',
        email: 'vadistic@gmail.com',
      })

      expect(info).toBeDefined()
      expect(info.accepted.length).toBe(1)
      expect(info.rejectd.length).toBe(0)
    })
  })
})
