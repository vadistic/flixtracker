import { registerEnumType } from '@nestjs/graphql'

export enum OrderDirection {
  // Specifies an ascending order for a given `orderBy` argument.
  asc = 'asc',
  // Specifies a descending order for a given `orderBy` argument.
  desc = 'desc',
}

registerEnumType(OrderDirection, {
  name: 'OrderDirection',
  description:
    'Possible directions in which to order a list of items when provided an `orderBy` argument.',
})

export const createOrderByEnum = <T>() => <K extends keyof T>(keys: K[]): Record<K, K> => {
  const res: Record<K, K> = {} as any

  for (const key of keys) {
    res[key] = key
  }

  return res
}
