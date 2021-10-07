import type { Socket } from 'socket.io'
import type { Room } from '../types/Room'
import type { User } from '../types/User'
import { Phase, UserRole, Turn } from '../types/enums'

export const rooms : Map<string, Room> = new Map()

export default async function joinRoom (id : string, ip : string, role : UserRole, room : string) {
  let user : User
  
  if (!rooms.has(room)) {
    user = {
      id,
      role,
      ip
    }

    rooms.set(room, {
      turn: Turn.BLUE,
      phase: Phase.NONE,
      bans: [],
      picks: {},
      users: [user]
    })

  } else {
    const newRole = await getUserRole(rooms.get(room), role, ip)
    user = {
      id,
      role: newRole,
      ip
    }

    rooms.get(room).users.push(user)
  }

  return user
}

export function switchTurn (roomId: string, socket : Socket) {
  rooms.get(roomId).turn = rooms.get(roomId).turn === Turn.RED ? Turn.BLUE : Turn.RED

  socket.nsp
    .to(roomId)
    .emit('turn', rooms.get(roomId).turn)
}

export function switchPhase (roomId: string, socket : Socket) {
  const room = rooms.get(roomId)
  const bestOf = 3
  const maps = 7

  if (room.phase === Phase.SIDE) {
    const allSidesPicked = Object.values(room.picks).every((p) => {
      return p.attacker !== undefined && p.defender !== undefined
    })

    if (allSidesPicked) {
      rooms.get(roomId).phase = Phase.DONE
    }

  } else if (room.phase === Phase.PICK && Object.keys(room.picks).length >= bestOf) {
    rooms.get(roomId).phase = Phase.SIDE

  } else if (room.phase === Phase.BAN && room.bans.length >= maps - (bestOf + 1)) {
    rooms.get(roomId).phase = Phase.PICK

  } else if (room.phase === Phase.NONE) {
    const blue = room.users.find(u => u.role === UserRole.BLUE)
    const red = room.users.find(u => u.role === UserRole.RED)
    
    if (blue !== undefined && red !== undefined) {
      rooms.get(roomId).phase = Phase.BAN
    }
  }

  socket.nsp
    .to(roomId)
    .emit('phase', rooms.get(roomId).phase)
}

async function getUserRole (room : Room, role : UserRole, ip : string) {
  if (role === UserRole.SPECTATOR) return UserRole.SPECTATOR

  const user = room.users.find(u => u.role === role && u.ip !== ip)
  return user === undefined ? role : UserRole.SPECTATOR
}

export function deleteUser (id: string) {
  for (const [roomId, room] of rooms) {
    const index = room.users.findIndex(u => u.id === id)
    room.users.slice(index, 1)

    if (room.users.length <= 0) {
      setTimeout(() => {
        if (room.users.length <= 0) rooms.delete(roomId)
      }, 3 * 60 * 1000)
    }
  }
}