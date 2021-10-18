<script lang="ts">
	export let disabled: boolean = false;
</script>

<div class="btn">
	<button {disabled} title="Select a map First" on:click><slot /></button>
</div>

<style>
	.btn {
		margin: 1rem auto 1rem;
		position: relative;
		min-width: 245px;
		position: relative;
	}

	.btn::before,
	.btn::after {
		content: '';
		position: absolute;
		left: -10px;
		border-color: rgb(118, 128, 121);
		border-style: solid;
		width: calc(100% + 20px);
		height: 50%;
		z-index: -1;
	}

	.btn::before {
		top: -10px;
		border-width: 2px 2px 0 2px;
	}

	.btn::after {
		bottom: -10px;
		border-width: 0 2px 2px 2px;
	}

	button {
		width: 100%;
		height: 65px;
		background: none;
		outline: none;
		border: none;
		font-size: 1.25em;
		background-color: rgb(15, 25, 35);
		color: rgb(236, 232, 225);
		position: relative;
		cursor: pointer;
		z-index: 1;
		overflow: hidden;
	}

	button:disabled {
		cursor: not-allowed;
		background-color: rgb(233, 230, 222);
		color: rgb(15, 25, 35);
	}

	button:disabled:hover::before {
		transform: translateX(-145%);
	}

	button:disabled::after {
		background-color: rgb(15, 25, 35);
	}

	button::before {
		content: '';
		background-color: rgb(255, 70, 85);
		width: 115%;
		height: 100%;
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-145%);
		z-index: -1;
		clip-path: polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%);
		transition: transform 0.3s ease;
	}

	button::after {
		content: '';
		background-color: rgb(255, 255, 255);
		width: 7px;
		height: 7px;
		position: absolute;
		bottom: 0;
		right: 0;
		z-index: 10;
		transition: background-color 0.3s ease 0.2s;
	}

	button:hover::before {
		transform: translateX(-50%);
	}

	button:hover::after {
		background-color: rgb(15, 25, 35);
	}
</style>
