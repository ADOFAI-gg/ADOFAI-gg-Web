<script lang="ts">
	import { Translation, type TranslationKey } from '@adofai-gg/ui'
	import type { HTMLInputAttributes } from 'svelte/elements'

	type Props = HTMLInputAttributes & {
		error?: TranslationKey
	}

	let { value = $bindable(''), error, disabled, ...rest }: Props = $props()
</script>

<label class="outlined-input" class:disabled class:has-error={!!error}>
	<input type="text" {disabled} class="input" bind:value {...rest} />

	{#if error}
		<div class="error">
			<Translation key={error} />
		</div>
	{/if}
</label>

<style lang="scss">
	@use '@adofai-gg/ui/dist/stylesheets/system/colors' as *;

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

		&.has-error {
			border-color: $red;
		}

		&.disabled {
			border-color: rgba(255, 255, 255, 0.1);
			cursor: default;
		}
	}

	.input {
		width: 100%;
		background-color: transparent;
		outline: none;
		font-size: 16px;
		inset: 0;
	}

	.input:global([type='number']) {
		appearance: textfield;

		&:focus,
		&:hover {
			appearance: inherit;
		}
	}

	.error {
		color: $red;
		font-size: 12px;
	}
</style>
