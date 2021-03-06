import { ForbiddenException, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-google-oauth20'

import { Config } from '../../config/config'
import { AUTH_ERROR } from '../auth.error'
import { AuthService } from '../auth.service'

export interface GoogleProfile {
  is: string
  displayName: string
  name: { familyName: string; givenName: string }
  emails: [{ value: string; verified: boolean }]
  photos: [{ value: string }]
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(readonly config: Config, readonly authService: AuthService) {
    super({
      clientID: config.auth.googleClient,
      clientSecret: config.auth.googleSecret,
      callbackURL: config.nest.url + '/auth/google/redirect',
      scope: ['email', 'profile'],
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: GoogleProfile): Promise<any> {
    const email = profile.emails.find(val => val.verified)?.value

    if (!email) throw new ForbiddenException(AUTH_ERROR.UNVERIFIED_OAUTH)

    // login or signup
    const user = await this.authService.oauth({
      email,
      strategy: 'GOOGLE',
      firstname: profile.name.givenName,
      lastname: profile.name.familyName,
    })

    return user
  }
}
