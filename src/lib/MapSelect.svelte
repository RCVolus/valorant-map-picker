<script>
	import Map from './Map.svelte';

	export let disableAll = false;

	async function fetchMaps() {
		const mapRespons = await fetch('https://valorant-api.com/v1/maps');
		return mapRespons.json();
	}
</script>

<div class="map-select">
	{#await fetchMaps()}
		<h1 style="margin: auto;">Loading ...</h1>
	{:then maps}
		{#each maps.data as map}
			{#if map.uuid !== 'ee613ee9-28b7-4beb-9666-08db13bb2244'}
				<Map uuid={map.uuid} name={map.displayName} src={map.splash} disabled={disableAll} />
			{/if}
		{/each}
	{:catch error}
		<div class="error">
			<h1>Something went wrong</h1>
			<p>{error}</p>
		</div>
	{/await}
</div>

<style>
	.map-select {
		width: 1005;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 2rem;
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
