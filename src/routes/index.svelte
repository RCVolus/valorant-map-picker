<script lang="ts">
	import Button from '$lib/Button.svelte';
	import { goto } from '$app/navigation';

	function action() {
		goto('/create');
	}
</script>

<svelte:head>
	<title>Valorant Map Select</title>
</svelte:head>

<div style="margin: auto 0;" />
<h1>Valorant Map Select</h1>
<p>
	This tool allows you to create a lobby for a general map pick and ban process in Valorant for a
	best of three matches. <br />
	You can use this tool either yourself together with an opponent and pick and ban maps yourself
	<br />
	or as a Game Ref or Admin and spectate the two teams pick and ban maps
</p>

<Button on:click={action}>Create Room</Button>

<style>
	p {
		text-align: center;
		font-size: 20px;
		margin: 2rem 10rem;
	}
</style>
