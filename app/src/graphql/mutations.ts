import { AuthVar, authVar, userVar, UserVar } from './cache'
import { AuthFragment, UserFragment } from './generated'

export const login = (authVar: AuthVar, userVar: UserVar) => {
  return (auth: AuthFragment, user: UserFragment) => {
    authVar({
      authenticated: true,
      accessToken: auth.accessToken,
      refreshToken: auth.refreshToken,
    })

    userVar(user)
  }
}

export const logout = (authVar: AuthVar, userVar: UserVar) => {
  return () => {
    authVar({
      authenticated: false,
      accessToken: undefined,
      refreshToken: undefined,
    })

    userVar(undefined)
  }
}

export const mutations = {
  login: login(authVar, userVar),
  logout: logout(authVar, userVar),
}
