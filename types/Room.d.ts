import type { User } from "./User";
import type { Turn, Phase } from './enums'

export interface Room {
  turn : Turn
  phase : Phase
  banns : string[]
  picks : {
    [mapId: string] : Side
  }
  users : User[]
}

export interface Side {
  attacker ? : 100 | 200
  defender ? : 100 | 200
}