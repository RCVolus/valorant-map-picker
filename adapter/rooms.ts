import type { Socket } from 'socket.io'
import { Phase, Room, Turn } from '../types/Room'
import { User, UserRole } from '../types/User'

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
      turn: Turn.BLUE,
      phase: Phase.NONE,
      banns: [],
      picks: [],
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
  rooms.get(roomId).turn = rooms.get(roomId).turn === Turn.BLUE ? Turn.RED : Turn.BLUE

  socket.nsp
    .to(roomId)
    .emit('turn', rooms.get(roomId).turn)
}

export function switchPhase (roomId: string, socket : Socket) {
  const room = rooms.get(roomId)

  if (room.phase === Phase.SIDE) {

  } else if (room.phase === Phase.PICK && room.picks?.length >= 3) {
    rooms.get(roomId).phase = Phase.SIDE
  } else if (room.phase === Phase.BAN && room.banns?.length >= 3) {
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