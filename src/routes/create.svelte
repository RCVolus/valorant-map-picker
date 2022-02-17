<script lang="ts">
	import Button from '$lib/Button.svelte';
	import Input from '$lib/Input.svelte';

	let bestOf = 3

	let roomGenerated = false

	let blueTeam = 'First'
	let redTeam = 'Second'

	let spectatorLink = '';
	let blueLink = '';
	let redLink = '';

	function generateLinks (code : string) {
		spectatorLink = window.location.protocol + '//' + window.location.host + '/spectator/' + code;
		blueLink = window.location.protocol + '//' + window.location.host + '/captain/' + code + '_100';
		redLink = window.location.protocol + '//' + window.location.host + '/captain/' + code + '_200';
	}

	async function createRoom () {
		console.log(blueTeam, redTeam)
		const res = await fetch('/api/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				bestOf,
				blueTeam,
				redTeam
			})
		})

		if (res.ok) {
			const code = (await res.json()).code
			generateLinks(code)
			roomGenerated = true
		}
	}
</script>

<div style="margin: auto 0;" />
<h1>Room Links</h1>
<p>
	You can use these links to join the rooms yourself <br />
	or to send them to other people so they can use this room as well
</p>

{#if !roomGenerated}
	<Input bind:value={blueTeam} placeholder="First Team Name" />
	<Input bind:value={redTeam} placeholder="Second Team Name" />

	<Button on:click={createRoom}>Create Room</Button>
{:else}
	<h4>Spectator</h4>
	<Input bind:value={spectatorLink} clickCopy placeholder="Link for Spectator" disabled readonly />

	<h4>Team 1</h4>
	<Input value={blueLink} clickCopy placeholder="Link for Spectator" disabled readonly />

	<h4>Team 2</h4>
	<Input value={redLink} clickCopy placeholder="Link for Spectator" disabled readonly />
{/if}

<style>
	p {
		text-align: center;
		font-size: 20px;
		margin: 2rem 10rem;
	}

	h4:not(:first-of-type) {
		margin-top: 1rem;
	}
</style>
