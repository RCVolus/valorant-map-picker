<script lang="ts">
	import MapSelect from '$lib/MapSelect.svelte';
  import Header from '$lib/Header.svelte';
	import { io } from "socket.io-client";

	import { page } from '$app/stores';
	import { browser } from '$app/env';

	import { banns, picks, phase, turn } from '../../store';
	import { UserRole } from '../../../types/User';
	import type { Room } from "$types/Room";

	import { Phase, Turn } from '../../../types/Room';

	if (browser) {
		const socket = io()
		socket.emit('joinRoom', {
			role: UserRole.SPECTATOR,
			room: $page.params.roomid
		})

		socket.on('ban', (newBanns: string[]) => {
			banns.set(newBanns)
		})
		socket.on('pick', (newPicks: string[]) => {
			picks.set(newPicks)
		})
		socket.on('turn', (newTurn: Turn) => {
			turn.set(newTurn)
		})
		socket.on('phase', (newPhase: Phase) => {
			phase.set(newPhase)
		})

		socket.on('roomState', (room: Room ) => {
			phase.set(room.phase)
			turn.set(room.turn)
			banns.set(room.banns)
			picks.set(room.picks)
		})
	}
</script>

<Header>
	{#if $phase === Phase.NONE}
		Pleas Wait
	{:else if $phase === Phase.SIDE}
		{`${$turn} is picking a Side`}
	{:else}
		{`${$turn} is ${$phase}ing a Map`}
	{/if}
</Header>

<MapSelect disableAll />