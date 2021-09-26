<script lang="ts">
  export let value : string = ""
  export let placeholder : string = ""
  export let disabled : boolean = false
  export let readonly : boolean = false
</script>

<div class="input">
  <input type="text" {value} {disabled} {readonly} {placeholder}>
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
</style>