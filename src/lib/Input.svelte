<script lang="ts">
	export let value: string = '';
	export let placeholder: string = '';
	export let disabled: boolean = false;
	export let readonly: boolean = false;

	function onClick () {
		navigator.clipboard.writeText(value).then(function() {
			
		}, function() {
			console.log('copping failed')
		});
	}
</script>

<div class="input">
	<input type="text" {value} {disabled} {readonly} {placeholder} on:click={onClick} />
</div>

<style lang="scss">
	.input {
		margin: 1rem auto 1rem;
		position: relative;
		min-width: 600px;
		height: 25px;
		position: relative;
	}

	.input::before,
	.input::after {
		content: '';
		position: absolute;
		left: -10px;
		border-color: rgb(118, 128, 121);
		border-style: solid;
		width: calc(100% + 20px);
		height: 50%;
		z-index: -1;
	}

	.input::before {
		top: -10px;
		border-width: 1.5px 1.5px 0 1.5px;
	}

	.input::after {
		bottom: -10px;
		border-width: 0 1.5px 1.5px 1.5px;
	}

	input {
		background: transparent;
		width: 100%;
		height: 100%;
		outline: none;
		border: none;
		text-align: center;
		font-size: 17px;
		position: relative;
	}

	input::before {
		content: '';
		background-color: rgb(255, 70, 85);
		width: 115%;
		height: 100%;
		position: absolute;
		bottom: 0;
		left: 50%;
		/* transform: translateX(-145%); */
		z-index: -1;
		clip-path: polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%);
		transition: transform 0.3s ease;
	}
</style>
