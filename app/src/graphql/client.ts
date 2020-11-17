import { ApolloClient, ApolloLink, createHttpLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

import { GRAPHQL_ENDPOINT, IS_DEV } from '../config'

import { cache } from './cache'

const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (IS_DEV && graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    )
  }

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

export const client = new ApolloClient({
  connectToDevTools: IS_DEV,
  cache,
  link: ApolloLink.from([errorLink, httpLink]),
})
