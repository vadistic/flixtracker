import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { Module } from '@nestjs/common'

import { Config } from '../config/config'

import { MailService } from './mail.service'

const Mailer = MailerModule.forRootAsync({
  inject: [Config],
  useFactory: (config: Config) => {
    return {
      transport: {
        port: config.smtp.port,
        host: config.smtp.host,
        ignoreTLS: !config.smtp.tls,
        auth: {
          user: config.smtp.username,
          pass: config.smtp.password,
        },
      },
      defaults: {
        SES: undefined, // typing bug
        from: { name: config.smtp.sender, address: config.smtp.email },
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }
  },
})

@Module({
  imports: [Mailer],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
