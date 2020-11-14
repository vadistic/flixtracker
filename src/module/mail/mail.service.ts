import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'

import { MailProps, MailType } from './mail.interface'
import { mailSubjectMap } from './templates/subjects'

export interface SendMessageInfo {
  accepted: string[]
  rejectd: string[]
  envelopeTime: number
  messageTime: number
  messageSize: number
  response: string
  envelope: { from: string; to: string[] }
  messageId: string
}

@Injectable()
export class MailService {
  constructor(readonly mailer: MailerService) {}

  async sendMail<T extends MailType>(template: T, props: MailProps<T>): Promise<SendMessageInfo> {
    const info = await this.mailer.sendMail({
      to: { name: props.name, address: props.email },
      subject: mailSubjectMap[template](props),
      template: template,
      context: props,
    })

    return info as SendMessageInfo
  }
}
