<script lang="ts">
	import { Translation, type TranslationKey } from '@adofai-gg/ui'
	import type { HTMLTextareaAttributes } from 'svelte/elements'

	type Props = HTMLTextareaAttributes & {
		error?: TranslationKey
	}

	let { value = $bindable(''), placeholder, error, disabled, ...rest }: Props = $props()
</script>

<label class="outlined-textarea" class:disabled class:has-error={!!error}>
	<textarea {disabled} class="input" bind:value {placeholder} {...rest}></textarea>

	{#if error}
		<div class="error">
			<Translation key={error} />
		</div>
	{/if}
</label>

<style lang="scss">
	@use '@adofai-gg/ui/dist/stylesheets/system/colors' as *;

	.outlined-textarea {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 2px;
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
		background-color: transparent;
		outline: none;
		font-size: 16px;
		resize: none;
		inset: 0;
	}

	.error {
		color: $red;
		font-size: 12px;
	}
</style>
