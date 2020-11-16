export enum MailType {
  // send after oauth register
  OAUTH_SIGNUP = 'oauth-singup.hbs',
  // send after local register
  LOCAL_SIGNUP = 'local-signup.hbs',
  // send after password reset
  RESET_PASSWORD = 'reset-password.hbs',
  // send after email confirmation resend
  VERIFY_RESEND = 'verify-resend.hbs',
}

export interface TemplateMailProps {
  name: string
}

export interface MailPropsMap {
  [MailType.OAUTH_SIGNUP]: {
    /*  */
  }
  [MailType.LOCAL_SIGNUP]: {
    code: string
    link: string
  }
  [MailType.RESET_PASSWORD]: {
    code: string
    link: string
  }
  [MailType.VERIFY_RESEND]: {
    code: string
    link: string
  }
}

export type MailProps<T extends MailType> = MailPropsMap[T]

export type MailSubjectMap = {
  [T in MailType]: (props: MailProps<T> & TemplateMailProps) => string
}
