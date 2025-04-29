<script lang="ts">
	import { getAvatarUrl } from '~/lib/utils/avatar'
	import type { PageData } from './$types'
	import LevelInfo from './level-info.svelte'
	import { Translation, type User } from '@adofai-gg/ui'

	interface Props {
		data: PageData
	}

	const { data }: Props = $props()
</script>

<div class="no-levels">
	<Translation key="manage:no-levels" />
</div>

<!-- <LevelInfo {user} /> -->

<style lang="scss">
	@use '@adofai-gg/ui/dist/stylesheets/system/colors' as *;

	.no-levels {
		display: flex;
		flex-grow: 1;
		align-items: center;
		justify-content: center;
		width: 0;
		height: 100%;
		text-align: center;
		opacity: 0.4;
		user-select: none;
	}
</style>
