<script lang="ts">
	import { Phase } from '../../types/enums';

	import { MapStore, phase } from '../store';
	import SideSelction from './SideSelction.svelte';

	const { selectedMap, bans, picks } = MapStore;

	export let src: string;
	export let name: string;
	export let uuid: string;
	let disableOverwrite: boolean = false;
	export { disableOverwrite as disabled };

	let isSelectedMap = false;
	$: {
		isSelectedMap = $selectedMap === uuid;
	}

	let isBanned = false;
	$: {
		isBanned = $bans.includes(uuid);
	}

	let isPicked = false;
	$: {
		isPicked = Object.keys($picks).includes(uuid);
	}

	let isDisabled = false || disableOverwrite;
	$: {
		isDisabled =
			$bans.includes(uuid) ||
			Object.keys($picks).includes(uuid) ||
			$phase === Phase.SIDE ||
			disableOverwrite;
	}

	function selectMap() {
		if (isDisabled) return;

		if ($selectedMap === uuid) {
			selectedMap.set(undefined);
		} else {
			selectedMap.set(uuid);
		}
	}
</script>

<div
	class="map"
	class:disabled={isDisabled}
	class:selected={isSelectedMap}
	class:banned={isBanned}
	class:picked={isPicked}
	on:click={selectMap}
>
	{#if isPicked}
		<SideSelction {uuid} />
	{/if}
	<div class="text">
		<p>{isBanned ? 'Banned' : isPicked ? `Round ${Object.keys($picks).indexOf(uuid) + 1}` : ''}</p>
		<h3>{name}</h3>
	</div>
	<div class="img-conatiner">
		<img {src} alt={name} />
	</div>
</div>

<style lang="scss">
	@keyframes show {
		from {
			transform: scaleX(0);
		}
		to {
			transform: scaleX(1);
		}
	}

	.map {
		box-sizing: border-box;
		display: block;
		pointer-events: all;
		cursor: pointer;
		flex: 1;
		height: auto;
		background: rgb(118, 128, 121);
		position: relative;
		--border-width: 1px;
		z-index: 1;
		transform-origin: left center;
		transform: scaleX(0);
		animation: show 0.3s ease forwards;
		padding: 25px;
		display: flex;
		flex-direction: column;

		$elements: 15;
		@for $i from 0 to $elements {
			&:nth-child(#{$i + 1}) {
				animation-delay: $i * 0.25s;
			}
		}

		&.disabled {
			pointer-events: none;
		}

		&::before,
		&::after {
			content: '';
			position: absolute;
			left: -10px;
			border-color: rgb(118, 128, 121);
			border-style: solid;
			width: calc(100% + 20px);
			height: 50%;
			transform-origin: center;
			transform: scaleY(0);
			transition: transform 0.3s ease;
		}

		&::before {
			top: -15px;
			border-width: var(--border-width) var(--border-width) 0;
		}

		&::after {
			bottom: -15px;
			border-width: 0 var(--border-width) var(--border-width);
		}

		&:not(.disabled):hover {
			&::before,
			&::after {
				transform: scaleY(1);
			}
		}
	}

	.img-conatiner {
		overflow: hidden;
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		z-index: -1;

		img {
			position: absolute;
			height: 100%;
			object-fit: cover;
			left: 50%;
			transform: translateX(-50%);
			filter: grayscale(0);
			transition: filter 0.3s ease;
		}

		&::before {
			content: '';
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			position: absolute;
			background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.45));
			z-index: 5;
		}

		.selected &::before {
			background: linear-gradient(to bottom, rgba(255, 70, 85, 0), rgba(255, 70, 85, 0.25));
		}

		.banned & img {
			filter: grayscale(0.9);
		}
	}

	.text {
		margin-top: auto;
		text-align: center;
		width: 100%;
		z-index: 10;
	}

	p {
		color: rgb(236, 232, 225);
		font-size: 2rem;
		font-weight: 800;
	}

	.banned p {
		color: rgb(255, 70, 85);
	}

	.picked p {
		color: rgb(251, 251, 66);
	}

	h3 {
		color: rgb(236, 232, 225);
		line-height: 1;
	}
</style>
