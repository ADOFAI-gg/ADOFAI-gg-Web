<script lang="ts">
	import { getAvatarUrl } from '~/lib/utils/avatar'
	import type { PageData } from './$types'
	import LevelInfo from './level-info.svelte'
	import RatingItem from './rating-item.svelte'
	import Searchbar from './searchbar.svelte'
	import type { User } from '@adofai-gg/ui'

	interface Props {
		data: PageData
	}

	const { data }: Props = $props()

	let user: User | null = $derived.by(() => {
		if (!data.currentUser) return null

		return {
			displayName: data.currentUser.displayName,
			avatarURL: getAvatarUrl(data.currentUser.authUserId, data.currentUser.avatar, null, 64),
			isAdmin: false
		} as User
	})
</script>

<div class="level-list">
	<Searchbar />
	<div class="level-list-content">
		<RatingItem />
	</div>
</div>

<LevelInfo {user} />

<style lang="scss">
	.level-list {
		width: 400px;

		&-content {
			margin-top: 16px;
		}
	}
</style>
