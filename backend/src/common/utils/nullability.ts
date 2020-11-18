/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/** merge a with b but skip nullish values */
export const mergeDefined = <A, B>(a: A, b: B): A & B => {
  const res = {} as A & B

  for (const [key, val] of Object.entries(a)) {
    if (val !== undefined && val !== null) {
      res[key as keyof A] = val
    }
  }

  for (const [key, val] of Object.entries(b)) {
    if (val !== undefined && val !== null) {
      res[key as keyof B] = val
    }
  }

  return res
}

export const stripUndefined = <T extends Record<string, any>>(obj: T): T => {
  for (const [key, val] of Object.entries(obj)) {
    if (val === undefined || val === null) {
      delete obj[key]
    }
  }

  return obj
}

/** temp solution for nulls in graphql requests */
export const stripNullsFromArgs = (args: any) => {
  if (!args || typeof args !== 'object') return args

  const res: any = {}

  for (const key of Object.keys(args)) {
    const val = args[key]

    if (val !== undefined && val !== null) {
      res[key] = args[key]
      continue
    }

    // deep for where (but just one level)
    if (key === 'where') {
      res[key] = stripNullsFromArgs(val)
      continue
    }
  }

  return res
}
