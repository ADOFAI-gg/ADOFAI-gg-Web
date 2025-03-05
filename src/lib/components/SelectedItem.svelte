<script lang="ts">
	import { Icon } from '@adofai-gg/ui'
	import type { Snippet } from 'svelte'

	interface Props {
		name: string
		icon?: Snippet
		onRemove?: () => void
	}

	const { name, icon, onRemove }: Props = $props()
</script>

<div class="selected-row">
	{@render icon?.()}
	<div class="name">{name}</div>
	{#if onRemove}
		<button class="remove-btn" type="button" onclick={onRemove}>
			<Icon icon="close" alt="remove" size={18} />
		</button>
	{/if}
</div>

<style lang="scss">
	.selected-row {
		display: flex;
		gap: 8px;
		align-items: center;
	}

	.name {
		flex-grow: 1;
		overflow: hidden;
		width: 0;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.remove-btn {
		--btn-opacity: 0.4;

		color: rgba(255, 255, 255, var(--btn-opacity));
		transition: color ease 0.2s;

		&:hover {
			--btn-opacity: 1;
		}
	}
</style>
