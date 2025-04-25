<script lang="ts">
	import { Icon } from '@adofai-gg/ui'
	import type { APIMember } from '~/lib/types'

	interface Props {
		icon: string
		users: APIMember[]
		alias?: string | null
	}

	const { icon, users, alias }: Props = $props()
</script>

<div class="user-list-item-user-list">
	<Icon size={18} alt="icon" {icon} style="color: rgba(255, 255, 255, 0.4)" />
	<div class="users">
		{#if alias}
			{alias}
		{:else}
			{users.map((x) => x.displayName).join(' & ')}
		{/if}
	</div>
</div>

<style lang="scss">
	.user-list-item-user-list {
		display: flex;
		gap: 4px;
		align-items: center;
	}

	.users {
		color: rgba(255, 255, 255, 0.8);
		font-size: 16px;
		line-height: 120%;
		flex-grow: 1;
		width: 0;

		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
