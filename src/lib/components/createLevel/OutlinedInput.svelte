<script lang="ts">
	interface Props {
		value: string
		placeholder?: string
		error?: string
	}

	let { value = $bindable(''), placeholder }: Props = $props()
</script>

<label class="outlined-input">
	<input type="text" class="input" bind:value {placeholder} />
</label>

<style lang="scss">
	.outlined-input {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-height: 38px;
		padding: 8px 16px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 8px;
		cursor: text;
	}

	.input {
		position: absolute;
		padding: 0 16px;
		background-color: transparent;
		outline: none;
		font-size: 16px;
		inset: 0;
	}
</style>
