<script lang="ts">
	import Footer from '$lib/Footer.svelte';
</script>

<main>
	<slot />
</main>

<style lang="scss">
	main {
		padding: 25px 125px;
		position: relative;
		width: 100%;
		height: 100vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.stripes {
		position: absolute;
		font-size: 25px;
		font-weight: bold;
		letter-spacing: 5px;
		color: #0f1923;
		opacity: 0.7;
		z-index: 20;
		transform-origin: center;
		text-align: center;

		img {
			margin-bottom: 25px;
		}

		&.left {
			bottom: 75px;
			left: -53px;

			p {
				transform: rotate(90deg);
			}
		}

		&.right {
			top: 15px;
			right: -13.5px;

			p {
				transform: rotate(-90deg);
			}
		}
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
		opacity: 0.125;
		-webkit-text-fill-color: transparent;
		-webkit-text-stroke-width: 2px;
		-webkit-text-stroke-color: inherit;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
