import { Box, Heading, Flex, Link } from '@chakra-ui/react'
import React from 'react'

export const Header: React.FC = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      // wrap="wrap"
      padding={4}
      bg="teal.500"
      color="white">
      <Box align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
          Flixtracker
        </Heading>
      </Box>
    </Flex>
  )
}

export const MenuItem: React.FC = ({ children }) => (
  <Link mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Link>
)
