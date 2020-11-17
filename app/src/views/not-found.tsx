import { Anchor, Box, Heading } from 'grommet'
import React from 'react'

import { handleNavigateTo } from '../routes'

export const NotFoundView: React.FC = () => {
  return (
    <Box>
      <Heading>Not found :(</Heading>

      <Anchor onClick={handleNavigateTo('/')}>Go Back</Anchor>
    </Box>
  )
}
