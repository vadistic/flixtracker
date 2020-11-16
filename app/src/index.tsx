import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './App'
import { client } from './graphql/client'
import { theme } from './theme'

import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
