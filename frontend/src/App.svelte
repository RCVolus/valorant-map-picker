<script lang="ts">
	import Button from "./components/Button.svelte";

	import Footer from "./components/Footer.svelte";
	import Header from "./components/Header.svelte";
	import MapSelect from "./components/MapSelect.svelte";

	async function action () {
		console.log('Test')
	}
</script>

<main>
	<Header />
	<MapSelect />
	<Button on:click={action} />
	<Footer />

	<div class="bg-text">Map Select</div>
</main>

<style>
	main {
		padding: 25px 125px;
		position: relative;
		width: 100%;
		height: 100vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	main::before {
		content: '';
		background-color: rgb(255, 70, 85);
		width: 50px;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 100% 80%, 80% 75%, 80% 0);
	}

	main::after {
		content: '';
		background-color: rgb(255, 70, 85);
		width: 50px;
		height: 100%;
		position: absolute;
		top: 0;
		right: 0;
		clip-path: polygon(100% 0%, 100% 100%, 20% 100%, 20% 20%, 0% 15%, 0% 0);
	}

	.bg-text {
		z-index: -1;
		position: absolute;
		font-family: Tungsten;
		font-weight: bold;
		text-transform: uppercase;
		font-size: 39rem;
		white-space: nowrap;
		line-height: 0.7;
		opacity: .125;
		-webkit-text-fill-color: transparent;
		-webkit-text-stroke-width: 2px;
		-webkit-text-stroke-color: inherit;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	}
</style>