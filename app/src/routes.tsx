import { navigate } from 'hookrouter'
import React from 'react'

import { LoginView } from './views/auth/login'
import { RecoverAccountView } from './views/auth/recover-account'
import { ResetPasswordView } from './views/auth/reset-password'
import { SignupView } from './views/auth/signup'
import { VerifyEmailView } from './views/auth/verify-email'
import { HomeView } from './views/home'
import { PromoView } from './views/promo'

export const publicRoutes = {
  '/login': () => <LoginView />,
  '/signup': () => <SignupView />,
  '/recover': () => <RecoverAccountView />,
  '/verify': () => <VerifyEmailView />,
  '/reset': () => <ResetPasswordView />,
  '/': () => <PromoView />,
}

export const appRoutes = {
  '/browse': () => <LoginView />,
  '/signup': () => <SignupView />,
  '/recover': () => <RecoverAccountView />,
  '/reset': () => <ResetPasswordView />,
  '/': () => <HomeView />,
}

export type AllRoutes = keyof typeof appRoutes | keyof typeof publicRoutes

export const handleNavigateTo = <Q extends Record<string, any>>(
  route: AllRoutes,
  replace?: boolean,
  qs?: Q,
) => () => navigate(route, replace, qs)
export const navigateTo = <Q extends Record<string, any>>(
  route: AllRoutes,
  replace?: boolean,
  qs?: Q,
) => navigate(route, replace, qs)
