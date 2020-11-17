import { Box, Button, Heading, Paragraph, Anchor } from 'grommet'
import React from 'react'

import { handleNavigateTo } from '../routes'

export const PromoView: React.FC = () => {
  return (
    <Box>
      <Heading>Welcome to FlixTracker!</Heading>

      <Heading level="3">What it is?</Heading>

      <Paragraph>
        Fixtracker is an ap that allows tou to track watched movies and TV shows.
      </Paragraph>

      <Heading level="3">Endpoints</Heading>

      <Box direction="column" gap="medium">
        <Anchor href="/api">/api</Anchor>
        <Anchor href="/auth">/auth</Anchor>
        <Anchor href="/graphql">/graphql</Anchor>
      </Box>

      <Heading level="2">Register now (btw. not ready yet)</Heading>

      <Box width="small">
        <Button label="Go to registration" onClick={handleNavigateTo('/signup')} />
      </Box>
    </Box>
  )
}
