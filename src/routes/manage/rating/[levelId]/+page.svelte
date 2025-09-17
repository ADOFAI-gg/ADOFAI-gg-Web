<script lang="ts">
	interface Props {
		data: PageData
	}

	const { data }: Props = $props()

	import type { User } from '@adofai-gg/ui'
	import type { PageData } from './$types'
	import { getAvatarUrl } from '~/lib/utils/avatar'
	import LevelInfo from '../level-info.svelte'

	let user: User = $derived.by(() => {
		return {
			displayName: data.currentUser!.displayName,
			avatarURL: getAvatarUrl(data.currentUser!.authUserId, data.currentUser!.avatar, null, 64),
			isAdmin: false
		} as User
	})
</script>

<LevelInfo {user} rating={data.rating} />
