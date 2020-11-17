import { Anchor, Box, Header, Heading } from 'grommet'
import { Github, Mail } from 'grommet-icons'
import React from 'react'

import { handleNavigateTo } from '../../routes'

export const AppHeader: React.FC = () => {
  return (
    <Header background="black" pad="small" justify="between">
      <Box align="center" direction="row" gap="xsmall">
        <Heading level="3" alignSelf="center" color="brand" size="small">
          <Anchor onClick={handleNavigateTo('/')}>FlixTracker</Anchor>
        </Heading>
      </Box>
      <Media />
    </Header>
  )
}

export const Media = () => (
  <Box direction="row" gap="xxsmall" justify="center">
    <Anchor
      a11yTitle="View on Github"
      href="https://www.github.com/vadistic/flix-tracker"
      icon={<Github />}
    />

    <Anchor a11yTitle="Mail to author" href="mailto:vadistic@gmail.com" icon={<Mail />} />
  </Box>
)
