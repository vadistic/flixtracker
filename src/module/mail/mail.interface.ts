export enum MailType {
  WELCOME = 'welcome.hbs',
}

export interface CommonMailProps {
  name: string
  email: string
}

export interface MailPropsMap {
  [MailType.WELCOME]: {
    /*  */
  }
}

export type MailProps<T extends MailType> = MailPropsMap[T] & CommonMailProps

export type MailSubjectMap = { [T in MailType]: (props: MailProps<T>) => string }
