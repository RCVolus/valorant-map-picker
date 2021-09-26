<script lang="ts">
	import Button from '$lib/Button.svelte';
	import { goto } from '$app/navigation';

	function action () {
		goto("/create")
	}
</script>

<svelte:head>
	<title>Valorant Map Select</title>
</svelte:head>

<div style="margin: auto 0;"></div>
<h1>Valorant Map Select</h1>
<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>

<Button on:click={action}>Create Room</Button>

<style>
	p {
		text-align: center;
		font-size: 20px;
		margin: 2rem 10rem;
	}
</style>