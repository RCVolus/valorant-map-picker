import type { User } from "./User";

export interface Room {
  turn : Turn
  phase : Phase
  banns : string[]
  picks : string[]
  users : User[]
}

export const enum Turn {
  RED = 'red',
  BLUE = 'blue',
}

export const enum Phase {
  BAN = 'ban',
  PICK = 'pick',
  SIDE = 'side',
  NONE = 'none'
}