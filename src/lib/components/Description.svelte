<script lang="ts">
	import { Translation } from '@adofai-gg/ui'
	import { onMount, type Snippet } from 'svelte'

	interface Props {
		children?: Snippet
		maxHeight: number
	}

	const { children, maxHeight }: Props = $props()

	let height = $state(0)

	let shouldShowMore = $derived(height > maxHeight)
	let show = $state(false)
</script>

<div class="description" style="--height: {maxHeight}px;" class:show>
	<div class="description-content">
		<div class="description-text" bind:clientHeight={height}>
			{@render children?.()}
		</div>
	</div>

	{#if shouldShowMore}
		<button
			class="show-more"
			onclick={() => {
				show = !show
			}}
		>
			<Translation key="common:show-more" />
		</button>
	{/if}
</div>

<style lang="scss">
	.description {
		position: relative;
		font-size: 15px;

		&-content {
			width: 100%;
			max-height: var(--height);
			overflow-y: hidden;
		}

		&.show &-content {
			max-height: unset;
		}

		&-text {
			white-space: pre-wrap;
		}
	}

	.show-more {
		color: rgba(255, 255, 255, 0.6);
		transition: color ease 0.2s;

		&:hover {
			color: white;
		}
	}
</style>
