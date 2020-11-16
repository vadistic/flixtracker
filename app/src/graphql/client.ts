import { ApolloClient, ApolloLink, createHttpLink } from '@apollo/client'

import { GRAPHQL_ENDPOINT, IS_DEV } from '../config'

import { cache } from './cache'

const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
})

export const client = new ApolloClient({
  connectToDevTools: IS_DEV,
  cache,
  link: ApolloLink.from([httpLink]),
})
