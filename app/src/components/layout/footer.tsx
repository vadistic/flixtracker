import { Footer, Text, Box, Anchor } from 'grommet'
import React from 'react'

export const AppFooter: React.FC = () => {
  return (
    <Footer background="black" pad="medium">
      <Box align="center" direction="row" gap="xsmall">
        <Text alignSelf="center" size="small">
          <strong>FlixTracker</strong> - track your movies and such stuff
        </Text>
      </Box>
      <Text textAlign="end" size="small">
        ©Copyright 2020 by <Anchor href="https://github.com/vadistic">vadistic</Anchor>
      </Text>
    </Footer>
  )
}
