<script lang="ts">
	export let big: boolean = false;
</script>

<span class="line" class:line-big={big} />

<style>
	.line {
		height: 1.5px;
		min-width: 50px;
		max-width: 100%;
		background-color: rgb(118, 128, 121);
		position: relative;
	}

	.line-big {
		flex-grow: 1;
	}

	.line-big::before,
	.line-big::after {
		content: '';
		background: rgb(118, 128, 121);
		width: 7px;
		height: 7px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	.line-big::before {
		left: 0;
	}

	.line-big::after {
		right: 0;
	}
</style>
