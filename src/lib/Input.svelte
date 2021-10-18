<script lang="ts">
	export let value: string = '';
	export let placeholder: string = '';
	export let disabled: boolean = false;
	export let readonly: boolean = false;

	let isCopied: boolean = false;

	function clickToCopy () {
		navigator.clipboard.writeText(value).then(function() {
			isCopied = true
			setTimeout(() => {
				isCopied = false
			}, 1500)
		}, function() {
			console.log('copping failed')
		});
	}
</script>

<div class="input" on:click={clickToCopy}>
	<span class="copied" class:isCopied></span>
	<input type="text" {value} {disabled} {readonly} {placeholder} />
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
	}

	.copied {
		pointer-events: none;
		width: calc(100% + 10px);
		height: calc(100% + 10px);
		position: absolute;
		top: -5px;
		left: -5px;
		z-index: 5;
		overflow: hidden;
	}

	.copied::before {
		content: 'copied';
		position: absolute;
		top: 0;
		left: -50%;
		width: 115%;
		height: 100%;
		background-color: #67c2aa;
		display: flex;
		text-align: center;
		justify-content: center;
		align-items: center;
		font-weight: bold;
		clip-path: polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%);
		transform: translateX(145%);
		transition: transform 0.3s ease;
	}

	.copied.isCopied::before {
		transform: translateX(35%);
	}
</style>
