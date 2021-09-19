<script lang="ts">
	import { selectedMap, banned, picked } from '../store';

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
		isBanned = $banned.includes(uuid);
	}

	let isPicked = false;
	$: {
		isPicked = $picked.includes(uuid);
	}

	let isDisabled = false || disableOverwrite;
	$: {
		isDisabled = $banned.includes(uuid) || $picked.includes(uuid) || disableOverwrite;
	}

	function selectMap() {
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
	<div class="text">
		<p>{isBanned ? 'Banned' : isPicked ? `Round ${$picked.indexOf(uuid) + 1}` : ''}</p>
		<h2>{name}</h2>
	</div>
	<div class="img-conatiner">
		<img {src} alt={name} />
	</div>
</div>

<style lang="scss">
	.map {
		display: block;
		pointer-events: all;
		cursor: pointer;
		min-width: 200px;
		max-width: 300px;
		flex-grow: 1;
		height: auto;
		background: rgb(118, 128, 121);
		position: relative;
		--border-width: 3px;
		z-index: 1;
		overflow: hidden;

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

		&:hover {
			&::before,
			&::after {
				transform: scaleY(1);
			}
		}
	}

	.img-conatiner {
		overflow: hidden;
		position: relative;
		height: 100%;
		width: 100%;

		img {
			position: absolute;
			height: 100%;
			object-fit: cover;
			left: 50%;
			transform: translateX(-50%);
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
		position: absolute;
		text-align: center;
		width: 100%;
		left: 0;
		bottom: 25px;
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

	h2 {
		color: rgb(236, 232, 225);
		line-height: 1;
	}
</style>
