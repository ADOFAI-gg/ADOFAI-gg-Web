<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { LayoutData } from './$types'
	import Sidebar from '$lib/components/management/sidebar.svelte'
	import SidebarCollapse from '~/lib/components/management/sidebar-collapse.svelte'
	import SidebarItem from '~/lib/components/management/sidebar-item.svelte'
	import { page } from '$app/state'
	import { Translation } from '@adofai-gg/ui'

	interface Props {
		data: LayoutData
		children: Snippet
	}

	const { data, children }: Props = $props()

	const activeSidebarItem = $derived(page.data.activeSidebarItem)
</script>

<div class="management-layout">
	<Sidebar collapseKey="collapse-management-sidebar">
		<SidebarCollapse>
			<Translation key="manage:menu-title" />
		</SidebarCollapse>
		<SidebarItem active={activeSidebarItem === 'rating'} href="/manage/rating" icon="scale">
			<Translation key="manage:menu-rating" />
		</SidebarItem>
		<!-- <SidebarItem active={activeSidebarItem === 'levels'} href="/manage/levels" icon="pencil">
			<Translation key="manage:menu-levels" />
		</SidebarItem> -->
	</Sidebar>

	{@render children()}
</div>

<style lang="scss">
	.management-layout {
		display: flex;
		overflow-x: auto;
		min-width: 100vw;
		height: calc(100vh - 56px);

		> :global(*:not(:last-child)) {
			border-right: 1px solid rgba(255, 255, 255, 0.1);
		}

		> :global(*) {
			padding: 24px;
		}
	}
</style>
