<script lang="ts">
	import { PersistedState } from 'runed'
	import { setContext, type Snippet } from 'svelte'
	import { SidebarCollapseContext } from '.'

	interface Props {
		collapseKey: string
		children: Snippet
	}

	const { collapseKey, children }: Props = $props()

	const collapsed = new PersistedState(collapseKey, false, {
		storage: 'local',
		syncTabs: true
	})

	setContext(SidebarCollapseContext, collapsed)
</script>

<aside class="sidebar">
	<div class="sidebar-content" class:expanded={!collapsed.current}>
		{@render children()}
	</div>
</aside>

<style lang="scss">
	.sidebar-content {
		width: 48px;

		&.expanded {
			width: 200px;
		}

		transition: width ease 0.2s;

		display: flex;
		flex-direction: column;
	}
</style>
