import { navigate } from 'hookrouter'
import React from 'react'

import { LoginView } from './views/auth/login'
import { ResetPasswordConfirmView } from './views/auth/reset-password-confirm'
import { ResetPasswordRequestView } from './views/auth/reset-password-request'
import { SignupView } from './views/auth/signup'
import { VerifyEmailConfirmView } from './views/auth/verify-email-confirm'
import { VerifyEmailRequestView } from './views/auth/verify-email-request'
import { DetailsView } from './views/details'
import { HomeView } from './views/home'
import { MoviesView } from './views/movies'
import { PromoView } from './views/promo'

export const publicRoutes = {
  '/login': () => <LoginView />,
  '/signup': () => <SignupView />,
  '/recover': () => <ResetPasswordRequestView />,
  '/verify': () => <VerifyEmailConfirmView />,
  '/resend': () => <VerifyEmailRequestView />,
  '/reset': () => <ResetPasswordConfirmView />,
  '/': () => <PromoView />,
}

export const appRoutes = {
  '/browse': () => <LoginView />,
  '/movies': () => <MoviesView />,
  '/details': () => <DetailsView />,
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
