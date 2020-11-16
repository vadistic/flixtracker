export const IS_DEV = !process.env.NODE_ENV || process.env.NODE_ENV !== 'development'

export const GRAPHQL_ENDPOINT = process.env.VITE_GRAPHQL_ENPOINT ?? 'http://localhost:3000/graphql'
export const AUTH_ENPOINT = process.env.AUTH_ENPOINT ?? 'http://localhost:3000/auth'
