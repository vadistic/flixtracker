import { MailSubjectMap, MailType } from '../mail.interface'

export const mailSubjectMap: MailSubjectMap = {
  [MailType.WELCOME]: ({ name }) => `Hello, ${name}!`,
}
