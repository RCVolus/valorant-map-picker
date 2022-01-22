<script lang="ts">
	import MapSelect from '$lib/MapSelect.svelte';
	import Header from '$lib/Header.svelte';
	import { io } from 'socket.io-client';
	import { page } from '$app/stores';
	import { browser } from '$app/env';
	import { isSpectator, MapStore, phase, turn } from '../../store';
	import type { Room, Side } from '../../../types/Room';
	import { Phase, Turn, UserRole } from '../../../types/enums';

	const { bans, picks } = MapStore;

	isSpectator.set(true);

	if (browser) {
		const socket = io();
		socket.emit('joinRoom', {
			role: UserRole.SPECTATOR,
			room: $page.params.roomid
		});

		socket.on('ban', (newBanns: string[]) => {
			bans.set(newBanns);
		});
		socket.on('pick', (newPicks: { [mapId: string]: Side }) => {
			picks.set(newPicks);
		});
		socket.on('side', (newPicks: { [mapId: string]: Side }) => {
			picks.set(newPicks);
		});
		socket.on('turn', (newTurn: Turn) => {
			turn.set(newTurn);
		});
		socket.on('phase', (newPhase: Phase) => {
			phase.set(newPhase);
		});

		socket.on('roomState', (room: Room) => {
			phase.set(room.phase);
			turn.set(room.turn);
			bans.set(room.bans);
			picks.set(room.picks);
		});
	}
</script>

<MapSelect disableAll />
