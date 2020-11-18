import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import fastq from 'fastq'

import { Config } from '../config/config'

import { mailSubjectMap } from './mail-subjects'
import { MailProps, MailType } from './mail.types'

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

export interface MailQueueTask {
  template: MailType
  user: User
  props: any
  retries: number
}

@Injectable()
export class MailService {
  constructor(readonly mailer: MailerService, readonly config: Config) {}

  onMailCb: fastq.done = () => {
    /* noop but could log somewhere */
  }

  pushTask(task: MailQueueTask) {
    this.fq.push({ ...task, retries: task.retries + 1 }, this.onMailCb)
  }

  worker: fastq.worker<MailService, MailQueueTask, boolean> = (task, cb) => {
    this.sendMail(task)
      .then(() => cb(null, true))
      .catch(() => {
        if (task.retries < this.config.smtp.retries) {
          this.pushTask({ ...task, retries: task.retries + 1 })
          return
        }

        // fail :<
        cb(null, false)
      })
  }

  /** this is quite naive qeue implementation but should work */
  fq = fastq<MailService, MailQueueTask, boolean>(this.worker, 1)

  // ────────────────────────────────────────────────────────────────────────────────

  scheduleMail<T extends MailType>(template: T, user: User, props: MailProps<T>) {
    this.pushTask({ props, template, user, retries: 0 })
  }

  async sendMail({ props, user, template }: MailQueueTask) {
    const name = this.getName(user)
    const templateProps = { ...props, name }

    const info: SendMessageInfo = await this.mailer.sendMail({
      to: { name: name, address: user.email },
      subject: mailSubjectMap[template](templateProps),
      template: template,
      context: templateProps,
    })

    return info
  }

  getName({ firstname, lastname, email }: User) {
    if (firstname) return firstname

    if (lastname) return lastname

    return email.replace(/@.*/, '')
  }
}
