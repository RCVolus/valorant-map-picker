<script>
	import { MapStore } from '../store';
	import Map from './Map.svelte';
	const { maps, loading, error } = MapStore;

	export let disableAll = false;
</script>

<div class="map-select">
	{#if $loading}
		<h1 style="margin: auto;">Loading ...</h1>
	{:else if $error}
		<div class="error">
			<h1>Something went wrong</h1>
			<p>{error}</p>
		</div>
	{:else}
		{#each $maps as map}
			{#if map.uuid !== 'ee613ee9-28b7-4beb-9666-08db13bb2244'}
				<Map uuid={map.uuid} name={map.displayName} src={map.splash} disabled={disableAll} />
			{/if}
		{/each}
	{/if}
</div>

<style>
	.map-select {
		width: 1005;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 20px;
		flex-grow: 1;
		margin: 3rem 0;
	}

	.error {
		text-align: center;
		margin: auto;
	}

	.error p {
		font-size: 25px;
	}
</style>
