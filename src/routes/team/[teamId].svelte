<script lang="ts">
	import { page } from '$app/stores';

	import MapSelect from '$lib/MapSelect.svelte';
	import Button from '$lib/Button.svelte';

	import { banned, picked, selectedMap } from '../../store';

	async function action() {
		if ($banned.length < 3) {
			banned.set([...$banned, $selectedMap]);
		} else {
			picked.set([...$picked, $selectedMap]);
		}

		selectedMap.set(undefined);
	}
</script>

<svelte:head>
	<title>Team {$page.params.teamId} | Valorant Map Select</title>
</svelte:head>

<MapSelect />
<Button on:click={action} />
