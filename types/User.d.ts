import type { UserRole } from './enums'

export interface User {
  id: string
  role: UserRole,
  ip: string
}