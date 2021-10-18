import { assetsMiddleware, kitMiddleware, prerenderedMiddleware } from '../build/middlewares.js';
import compression from 'compression';
import express from 'express';
import * as http from 'http';
import { Server } from 'socket.io';
import joinRoom, { deleteUser, rooms, switchPhase, switchTurn } from './rooms.js';
import { UserRole } from '../types/enums';

const app = express();
const port = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
	pingInterval: 1000,
	pingTimeout: 2000
});

io.on('connection', (socket) => {
	socket.on('joinRoom', async ({ role, room }) => {
		socket.join(room);
		const user = await joinRoom(socket.id, socket.handshake.address, role, room);
		socket.emit('user', user);

		socket.nsp.to(room).emit('roomState', rooms.get(room));

		if (role !== UserRole.SPECTATOR) {
			switchPhase(room, socket);

			socket.on('ban', (ban: string, team: 100 | 200) => {
				if (rooms.get(room).turn !== team) return;

				if (rooms.get(room).bans) {
					rooms.get(room).bans.push(ban);
				} else {
					rooms.get(room).bans = [ban];
				}

				socket.nsp.to(room).emit('ban', rooms.get(room).bans);

				switchTurn(room, socket);
				switchPhase(room, socket);
			});

			socket.on('pick', (pick: string, team: 100 | 200) => {
				if (rooms.get(room).turn !== team) return;

				rooms.get(room).picks[pick] = {};

				socket.nsp.to(room).emit('pick', rooms.get(room).picks);

				switchTurn(room, socket);
				switchPhase(room, socket);
			});

			socket.on('side', (map, side, team) => {
				if (rooms.get(room).turn !== team) return;

				if (rooms.get(room).picks) {
					rooms.get(room).picks[map][side] = team;
					rooms.get(room).picks[map][side === 'attacker' ? 'defender' : 'attacker'] =
						team === 100 ? 200 : 100;
				}

				socket.nsp.to(room).emit('side', rooms.get(room).picks);

				switchTurn(room, socket);
				switchPhase(room, socket);
			});
		}
	});

	socket.on('disconnect', (e) => {
		deleteUser(socket.id);
	});
});

app.use(compression({ threshold: 0 }), assetsMiddleware, kitMiddleware, prerenderedMiddleware);

server.listen(port, () => {
	console.log(`Listening for requests on http://localhost:${port}`);
});
