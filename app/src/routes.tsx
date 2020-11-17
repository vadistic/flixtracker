import { navigate } from 'hookrouter'
import React from 'react'

import { LoginView } from './views/auth/login'
import { PromoView } from './views/promo'
import { RecoverView } from './views/auth/recover'
import { ResetView } from './views/auth/reset'
import { SignupView } from './views/auth/signup'
import { HomeView } from './views/home'

export const publicRoutes = {
  '/login': () => <LoginView />,
  '/signup': () => <SignupView />,
  '/recover': () => <RecoverView />,
  '/reset': () => <ResetView />,
  '/': () => <PromoView />,
}

export const appRoutes = {
  '/browse': () => <LoginView />,
  '/signup': () => <SignupView />,
  '/recover': () => <RecoverView />,
  '/reset': () => <ResetView />,
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
