import { Container, Heading } from '@chakra-ui/react'
import React from 'react'

import { Header } from './components/header'

export const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <Container as="main">
        <Heading>Hello</Heading>
      </Container>
    </div>
  )
}
