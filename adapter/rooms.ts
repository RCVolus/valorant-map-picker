import type { Socket } from 'socket.io';
import type { Room } from '../types/Room';
import type { User } from '../types/User';
import { Phase, UserRole, Turn } from '../types/enums';

export const rooms: Map<string, Room> = new Map();

export default async function joinRoom(id: string, ip: string, role: UserRole, room: string): Promise<User> {
	let user: User;

	if (!rooms.has(room)) {
		throw new Error('Room could not be found')
	} else {
		const newRole = await getUserRole(rooms.get(room), role, ip);
		user = {
			id,
			role: newRole,
			ip
		};

		rooms.get(room).users.push(user);
	}

	return user;
}

export function createRoom (bestOf : 3 | 5 = 3, blueTeam = 'Blue', redTeam = 'Red') : string {
	const code = uuidv4();

	rooms.set(code, {
		step: 0,
		turn: Turn.BLUE,
		phase: Phase.NONE,
		blueTeam,
		redTeam,
		bestOf,
		bans: [],
		picks: {},
		users: []
	});

	return code
}

function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

export function switchTurn(roomId: string, socket: Socket): void {
	const room = rooms.get(roomId);
	const step = room.step

	let turn : Turn

	switch (step) {
		case 0:
			turn = Turn.RED
			break
		case 1:
			turn = Turn.BLUE
			break
		case 2:
			turn = Turn.RED
			break
		case 3:
			turn = Turn.RED
			break
		case 4:
			turn = Turn.BLUE
			break
		case 5:
			turn = Turn.BLUE
			break
		case 6:
			turn = Turn.RED
			break
		case 7:
			turn = Turn.BLUE
			break
		case 8:
			turn = Turn.BLUE
			break
		default:
			turn = Turn.BLUE
	}

	rooms.get(roomId).turn = turn;
	rooms.get(roomId).step += 1;

	socket.nsp.to(roomId).emit('turn', rooms.get(roomId).turn);
}

export function switchPhase(roomId: string, socket: Socket): void {
	const room = rooms.get(roomId);
	const step = room.step

	if (room.phase === Phase.NONE) {
		const blue = room.users.find((u) => u.role === UserRole.BLUE);
		const red = room.users.find((u) => u.role === UserRole.RED);

		if (blue === undefined || red === undefined) {
			return
		}
	}

	let phase : Phase

	switch (step) {
		case 0:
			phase = Phase.BAN
			break
		case 1:
			phase = Phase.BAN
			break
		case 2:
			phase = Phase.PICK
			break
		case 3:
			phase = Phase.SIDE
			break
		case 4:
			phase = Phase.PICK
			break
		case 5:
			phase = Phase.SIDE
			break
		case 6:
			phase = Phase.BAN
			break
		case 7:
			phase = Phase.BAN
			break
		case 8:
			phase = Phase.PICK
			break
		case 9:
			phase = Phase.SIDE
			break
		case 10:
			phase = Phase.DONE
			break
		default:
			phase = Phase.NONE
	}

	rooms.get(roomId).phase = phase

	socket.nsp.to(roomId).emit('phase', rooms.get(roomId).phase);
}

async function getUserRole(room: Room, role: UserRole, ip: string) {
	if (role === UserRole.SPECTATOR) return UserRole.SPECTATOR;

	const user = room.users.find((u) => u.role === role && u.ip !== ip);
	return user === undefined ? role : UserRole.SPECTATOR;
}

export function deleteUser(id: string): void {
	for (const [roomId, room] of rooms) {
		const index = room.users.findIndex((u) => u.id === id);
		room.users.slice(index, 1);

		if (room.users.length <= 0) {
			setTimeout(() => {
				if (room.users.length <= 0) rooms.delete(roomId);
			}, 3 * 60 * 1000);
		}
	}
}
