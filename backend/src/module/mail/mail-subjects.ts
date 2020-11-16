import { MailSubjectMap, MailType } from './mail.types'

export const mailSubjectMap: MailSubjectMap = {
  [MailType.OAUTH_SIGNUP]: ({ name }) => `Hello, ${name}!`,
  [MailType.LOCAL_SIGNUP]: ({ name }) => `Hello, ${name}!`,
  [MailType.VERIFY_RESEND]: () => `Flixtracker email verification`,
  [MailType.RESET_PASSWORD]: () => `Flixtracker password reset`,
}
