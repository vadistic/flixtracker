import { registerEnumType } from '@nestjs/graphql'

export const UserRole = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const

export type UserRole = typeof UserRole[keyof typeof UserRole]

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'User role',
})
