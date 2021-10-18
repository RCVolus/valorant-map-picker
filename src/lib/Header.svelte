<script lang="ts">
	import Line from './Line.svelte';

	export let leftTimer: number = 0;
	export let rightTimer: number = 0;
</script>

<header>
	<Line big />
	<span class="line line-big" />
	<div class="timer-wrapper" class:hide={leftTimer <= 0}>
		<h3 class="timer">{('0' + leftTimer).slice(-2)}</h3>
		<Line />
	</div>
	<h1><slot /></h1>
	<div class="timer-wrapper" class:hide={rightTimer <= 0}>
		<Line />
		<h3 class="timer">{('0' + rightTimer).slice(-2)}</h3>
	</div>
	<Line big />
</header>

<style>
	header {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	h1,
	h3 {
		margin: 0 2rem;
	}

	.timer-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 8%;
		transition: width 0.3s ease;
	}

	.hide {
		width: 0%;
		overflow: hidden;
	}
</style>
