import { ApolloProvider } from '@apollo/client'
import { Grommet } from 'grommet'
import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './App'
import { client } from './graphql/client'
import { theme } from './theme'

import './index.css'

// hookrouter breaks in strict mode :<
ReactDOM.render(
  <Grommet theme={theme}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Grommet>,
  document.getElementById('root'),
)
