<script lang="ts">
	import type { UserListItemModel, TranslationKey } from '@adofai-gg/ui'
	import { UserList, Panel, PanelTitle, Translation } from '@adofai-gg/ui'

	interface Props {
		items: UserListItemModel[]
		title: TranslationKey
	}

	const { items, title }: Props = $props()
</script>

<Panel>
	<PanelTitle>
		<Translation key={title} />
	</PanelTitle>

	<div class="user-list">
		<UserList {items} />
	</div>
</Panel>

<style lang="scss">
	.user-list {
		margin-top: 8px;
	}
</style>
