<script lang="ts">
	import { Icon, PopoverContentPanel } from '@adofai-gg/ui'
	import type { Snippet } from 'svelte'
	import { getSidebarCollapse } from '.'
	import { fade, fly } from 'svelte/transition'
	import { createTooltip, melt } from '@melt-ui/svelte'

	interface Props {
		href: string
		children: Snippet
		icon: string
		active: boolean
	}

	const { href, children, active, icon }: Props = $props()

	const collapse = getSidebarCollapse()

	const {
		elements: { trigger, content },
		states: { open }
	} = createTooltip({
		positioning: {
			placement: 'right'
		},
		openDelay: 0,
		closeDelay: 0,
		closeOnPointerDown: true,
		forceVisible: true,
		disableHoverableContent: true
	})
</script>

<a {href} class="sidebar-item" use:melt={$trigger} class:active>
	<div class="icon">
		<Icon alt="icon" {icon} size={24} />
	</div>

	{#if !collapse.current}
		<div class="text" transition:fade={{ duration: 200 }}>
			{@render children()}
		</div>
	{/if}
</a>

{#if $open}
	<div transition:fly={{ y: 12 }} use:melt={$content}>
		{#if collapse.current}
			<PopoverContentPanel>
				<div class="tooltip-panel">
					{@render children()}
				</div>
			</PopoverContentPanel>
		{/if}
	</div>
{/if}

<style lang="scss">
	@use '@adofai-gg/ui/dist/stylesheets/system/colors' as *;

	.sidebar-item {
		display: flex;
		height: 48px;
		align-items: center;
		gap: 8px;
		border-radius: 8px;
		padding: 0 12px;

		transition: background-color ease 0.2s;

		&:hover,
		&.active {
			background: rgba($darkblue, 0.2);
		}

		.icon {
			width: 24px;
			height: 24px;
		}

		.text {
			white-space: nowrap;
			flex-grow: 1;
			width: 0;
		}
	}
</style>
