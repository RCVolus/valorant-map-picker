import type { Socket } from 'socket.io'
import type { Room } from '../types/Room'
import type { User } from '../types/User'
import { Phase, UserRole, Turn } from '../types/enums'

export const rooms : Map<string, Room> = new Map()

export default async function joinRoom (id : string, ip: string, role : UserRole, room : string) {
  let user : User
  if (!rooms.has(room)) {
    user = {
      id,
      role,
      ip
    }
    rooms.set(room, {
      turn: Turn.RED,
      phase: Phase.NONE,
      banns: [],
      picks: {},
      users: [user]
    })
  } else {
    const newRole = checkRoles(rooms.get(room), role) && !(await findUserWithIP(ip)) ? UserRole.SPECTATOR : role
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
  let sidePicks = 0

  if (room.phase === Phase.SIDE) {
    sidePicks++
    if (sidePicks >= bestOf) {
      rooms.get(roomId).phase = Phase.DONE
    }
  } else if (room.phase === Phase.PICK && Object.keys(room.picks).length >= bestOf) {
    rooms.get(roomId).phase = Phase.SIDE
  } else if (room.phase === Phase.BAN && room.banns.length >= maps - (bestOf + 1)) {
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

function checkRoles (room : Room, role : UserRole) {
  return room.users.find(u => u.role === role && role !== UserRole.SPECTATOR)
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

export async function findUserWithIP (ip: string) {
  let user : User;

  for await (const room of rooms.values()) {
    user = room.users.find(u => u.ip === ip)
  }

  return user !== undefined
}