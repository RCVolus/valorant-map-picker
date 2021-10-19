<script lang="ts">
	import { io } from 'socket.io-client';
	import Header from '$lib/Header.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/env';
	import MapSelect from '$lib/MapSelect.svelte';
	import Button from '$lib/Button.svelte';
	import { isSpectator, MapStore, phase, selectedSide, turn } from '../../store';
	import type { Room, Side } from '../../../types/Room';
	import type { User } from '../../../types/User';
	import { goto } from '$app/navigation';
	import { Phase, Turn, UserRole } from '../../../types/enums';

	const { selectedMap, bans, picks } = MapStore;

	const team = Number($page.params.team);

	isSpectator.set(false);

	let action: () => void;

	if (browser) {
		const socket = io();

		socket.emit('joinRoom', {
			role: team,
			room: $page.params.roomid
		});

		socket.on('ban', (newBans: string[]) => {
			bans.set(newBans);
		});
		socket.on('pick', (newPicks: { [mapId: string]: Side }) => {
			picks.set(newPicks);
		});
		socket.on('side', (newPicks: { [mapId: string]: Side }) => {
			picks.set(newPicks);
		});
		socket.on('turn', (newTurn: Turn) => {
			console.log(newTurn);
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

		socket.on('user', (user: User) => {
			if (user === undefined || user.role === UserRole.SPECTATOR) {
				goto('/spectator/' + $page.params.roomid);
			}
		});

		action = () => {
			if ($selectedMap) {
				socket.emit($phase, $selectedMap, team);
				selectedMap.set(undefined);
			} else if ($selectedSide) {
				socket.emit($phase, $selectedSide[0], $selectedSide[1], team);
				selectedSide.set(undefined);
			}
		};
	}
</script>

<Header>
	{#if $phase === Phase.NONE}
		Please Wait
	{:else if $phase === Phase.DONE}
		Complete
	{:else if $phase === Phase.SIDE}
		{#if $turn !== team}
			Opponent is picking a Side
		{:else}
			pick a Side
		{/if}
	{:else if $turn !== team}
		{`Opponent is ${$phase}ing a Map`}
	{:else}
		{`${$phase} a Map`}
	{/if}
</Header>

<MapSelect disableAll={$turn !== team} />
<Button
	on:click={action}
	disabled={($selectedMap === undefined && $selectedSide === undefined) || $turn !== team}
	>Confirm</Button
>
