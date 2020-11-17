import { InMemoryCache, makeVar, ReactiveVar } from '@apollo/client'

import { UserFragment } from './generated'

export const cache = new InMemoryCache({})

// ────────────────────────────────────────────────────────────────────────────────

export interface AuthShape {
  authenticated: boolean
  refreshToken?: string
  accessToken?: string
}

export type AuthVar = ReactiveVar<AuthShape>

export const authVar = makeVar<AuthShape>({
  authenticated: false,
  accessToken: undefined,
  refreshToken: undefined,
})

// ────────────────────────────────────────────────────────────────────────────────

export type UserShape = UserFragment | undefined

export type UserVar = ReactiveVar<UserShape>

export const userVar = makeVar<UserShape>(undefined)
