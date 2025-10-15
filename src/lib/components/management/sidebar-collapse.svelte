<script lang="ts">
	import type { Snippet } from 'svelte'
	import { getSidebarCollapse } from '.'
	import { Icon } from '@adofai-gg/ui'
	import { fade } from 'svelte/transition'

	interface Props {
		children: Snippet
	}

	const { children }: Props = $props()

	const collapse = getSidebarCollapse()
</script>

<button onclick={() => (collapse.current = !collapse.current)} class="sidebar-collapse-button">
	{#if !collapse.current}
		<div class="text" transition:fade={{ duration: 200 }}>
			{@render children()}
		</div>
	{/if}

	<div class="icon" style="transform: rotate({collapse.current ? 180 : 0}deg);">
		<Icon alt="icon" icon="chevronLeft" size={20} />
	</div>
</button>

<style lang="scss">
	@use '@adofai-gg/ui/dist/stylesheets/system/colors' as *;

	.sidebar-collapse-button {
		padding: 12px;
		display: flex;
		text-align: left;
		border-radius: 8px;
		align-items: center;
		position: relative;
		height: 44px;

		transition: background-color ease 0.2s;

		&:hover {
			background: rgba($darkblue, 0.2);
		}
	}

	.icon {
		transition: transform ease 0.2s;
		position: absolute;
		right: 14px;
		top: 12px;
	}

	.text {
		font-size: 14px;
		font-weight: 700;
		opacity: 0.6;
		line-height: 140%;
		flex-grow: 1;
		white-space: nowrap;
	}
</style>
