<script lang="ts">
	import { Translation, type User } from '@adofai-gg/ui'
	import InfoDetails from './info-details.svelte'
	import InfoMainSection from './info-main-section.svelte'
	import type { APILevelRating } from '~/lib'

	interface Props {
		user: User
		rating: APILevelRating
	}

	const { user, rating }: Props = $props()
</script>

<InfoMainSection {rating} />

<InfoDetails {user} />
