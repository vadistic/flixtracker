import { Box, Main } from 'grommet'
import { useRoutes } from 'hookrouter'
import React from 'react'

import { AppFooter } from './components/layout/footer'
import { AppHeader } from './components/layout/header'
import { AppSidebar } from './components/layout/sidebar'
import { appRoutes, publicRoutes } from './routes'
import { NotFoundView } from './views/not-found'
export const App: React.FC = () => {
  const authenticated = false

  const route = useRoutes(authenticated ? appRoutes : publicRoutes)

  return (
    <Box className="app" height={{ min: '100vh' }} direction="column" justify="stretch">
      <AppHeader />

      <Box direction="row" height={{ min: '100%' }} flex="grow">
        {authenticated && <AppSidebar />}

        <Main pad="medium">{route ?? <NotFoundView />}</Main>
      </Box>

      <AppFooter />
    </Box>
  )
}
