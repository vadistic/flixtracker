import { gql } from '@apollo/client'

export const USER_GRAGMENT = gql`
  fragment UserFragment on User {
    id
    createdAt
    updatedAt
    email
    role
    firstname
    lastname
  }
`

export const AUTH_FRAGMENT = gql`
  fragment AuthFragment on Auth {
    refreshToken
    accessToken
  }
`
