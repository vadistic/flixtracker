import { MovieType } from '@prisma/client'

import { OmdbResultType } from './omdb.interfaces'

const EMPTY = 'N/A'

/** convert empty markers to undefined  */
export const toNullable = <T extends unknown>(value: T) => {
  if (!value || value === EMPTY) return undefined
  return value
}

/** convert comma separated string to array  */
export const toArray = (value: string): string[] => {
  if (!value || value === EMPTY) return []

  return value
    .split(',')
    .map(val => val.trim())
    .filter(el => !!el)
}

/** convert coma separated numberstring to int  */
export const toInt = (value: string) => {
  if (value === undefined || value === EMPTY) return undefined

  const parsed = parseInt(value.replace(',', ''), 10)

  if (Number.isNaN(parsed)) return undefined

  return parsed
}

/** convert dot separated numberstring to float  */
export const toFloat = (value: string) => {
  if (value === undefined || value === EMPTY) return undefined

  const parsed = parseFloat(value.replace(',', ''))

  if (Number.isNaN(parsed)) return undefined

  return parsed
}

/** convert date string to date  */
export const toDate = (value: string) => {
  if (value === undefined || value === EMPTY) return undefined

  const parsed = new Date(value)

  // invalid dates return NaN getTime()
  if (Number.isNaN(parsed.getTime())) return undefined

  return parsed
}

export const toMovieType = (type: OmdbResultType): MovieType => {
  if (type === 'movie') return MovieType.MOVIE
  if (type === 'series') return MovieType.SERIES

  return MovieType.EPISODE
}
