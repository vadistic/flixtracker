import { Box, Button, Heading, Paragraph } from 'grommet'
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

      <Heading level="3">Something else?</Heading>
      <Paragraph>Yeah, I should write some copy here.</Paragraph>

      <Heading level="2">Register now!</Heading>

      <Box width="small">
        <Button label="Go to registration" onClick={handleNavigateTo('/signup')} />
      </Box>
    </Box>
  )
}
