<script lang="ts">
	import { Phase } from '../../types/enums';
	import { isSpectator, phase, selectedSide, turn } from '../store';
	import { page } from '$app/stores';
	import { MapStore } from '../store';

	const { picks } = MapStore;

	const team = (Number($page.params.team) as 100 | 200) || 100;
	const otherTeam = team === 100 ? 200 : 100;

	export let uuid: string;

	let isDisabled = false || $isSpectator;
	let hidden = false;

	$: {
		hidden = $phase !== Phase.SIDE && $phase !== Phase.DONE;
	}

	$: {
		if ($phase === Phase.SIDE) {
			let index = Object.keys($picks).indexOf(uuid);
			let previousIndex: number = index > 0 ? index - 1 : null;

			if (previousIndex !== null) {
				let previousPick = Object.values($picks)[previousIndex];
				if (!previousPick.attacker || !previousPick.defender) {
					hidden = true;
				} else {
					hidden = false;
				}
			}
		}
	}

	let attacker: 100 | 200;
	let defender: 100 | 200;

	$: {
		if ($selectedSide !== undefined && $selectedSide[0] === uuid) {
			if ($selectedSide[1] === 'attacker') {
				attacker = team;
				defender = undefined;
			} else if ($selectedSide[1] === 'defender') {
				defender = team;
				attacker = undefined;
			}
		} else if (attacker === undefined || defender === undefined) {
			attacker = undefined;
			defender = undefined;
		}
	}

	$: {
		const attackerPick = $picks[uuid]?.attacker;
		const defenderPick = $picks[uuid]?.defender;

		if (attackerPick !== undefined && defenderPick !== undefined) {
			isDisabled = true;
			if (attackerPick === team) {
				attacker = team;
				defender = otherTeam;
			} else if (defenderPick === team) {
				attacker = otherTeam;
				defender = team;
			}
		}
	}

	function selectSide(side: 'attacker' | 'defender') {
		selectedSide.set([uuid, side]);
	}
</script>

<div class="sides" class:hidden class:disabled={isDisabled || $turn !== team}>
	<div
		class="side attacker"
		class:blue={attacker === team}
		class:red={attacker === otherTeam}
		on:click={() => selectSide('attacker')}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="currentColor"
			class="bi bi-x-lg"
			viewBox="0 0 16 16"
		>
			<path
				d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"
			/>
		</svg>
	</div>
	<div
		class="side defender"
		class:blue={defender === team}
		class:red={defender === otherTeam}
		on:click={() => selectSide('defender')}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="currentColor"
			class="bi bi-shield"
			viewBox="0 0 16 16"
		>
			<path
				d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"
			/>
		</svg>
	</div>
</div>

<style lang="scss">
	.sides {
		display: flex;
		pointer-events: all !important;
		gap: 25px;

		&.disabled {
			pointer-events: none !important;
		}

		&.hidden {
			display: none;
		}
	}

	.side {
		position: relative;
		flex-grow: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		--border-width: 2px;
		color: #fff;
		padding: 10px;
		transition: background 0.15s ease;

		&::before,
		&::after {
			content: '';
			position: absolute;
			left: 0px;
			border-color: #fff;
			border-style: solid;
			width: 100%;
			height: calc(50% - 10px);
		}

		&::before {
			top: 0px;
			border-width: var(--border-width) var(--border-width) 0;
		}

		&::after {
			bottom: 0px;
			border-width: 0 var(--border-width) var(--border-width);
		}

		svg {
			height: 30px;
			width: 30px;
		}

		&:hover {
			background-color: rgba(#67c2aa, 0.75);
		}

		&.red {
			background-color: rgba(#ef5c55, 0.75);
		}

		&.blue {
			background-color: rgba(#67c2aa, 0.75);
		}
	}
</style>
