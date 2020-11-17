import { navigate } from 'hookrouter'
import React from 'react'

import { HomeView } from './views/home'
import { LoginView } from './views/login'
import { PromoView } from './views/promo'
import { RecoverView } from './views/recover'
import { ResetView } from './views/reset'
import { SignupView } from './views/signup'

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
