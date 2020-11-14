export function toInt(value: number | string): number
export function toInt(value?: number | string): number | undefined
export function toInt(value?: number | string): number | undefined {
  if (!value) return undefined

  if (typeof value === 'number') {
    return Number.isInteger(value) ? value : undefined
  }

  const parsed = parseInt(value, 10)

  return Number.isInteger(parsed) ? parsed : undefined
}

export function toFloat(value: number | string): number
export function toFloat(value?: number | string): number | undefined
export function toFloat(value?: number | string): number | undefined {
  if (!value) return undefined

  if (typeof value === 'number') {
    return Number.isNaN(value) ? undefined : value
  }

  const parsed = parseFloat(value)

  return Number.isNaN(parsed) ? undefined : parsed
}

export function toBool(value: number | string): boolean
export function toBool(value?: number | string): boolean | undefined
export function toBool(value?: number | string): boolean | undefined {
  if (value === undefined) return undefined
  if (!value || value === 'false') return false

  return true
}
