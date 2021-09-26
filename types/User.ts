export interface User {
  id: string
  role: UserRole,
  ip: string
}

export const enum UserRole {
  BLUE = 'blue',
  RED = 'red',
  SPECTATOR = 'spectator'
}