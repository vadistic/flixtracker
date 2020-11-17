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

/** merge a with b but skip nullish values */
export const stripUndefined = <T extends Record<string, any>>(obj: T): T => {
  for (const [key, val] of Object.entries(obj)) {
    if (val === undefined || val === null) {
      delete obj[key]
    }
  }

  return obj
}
