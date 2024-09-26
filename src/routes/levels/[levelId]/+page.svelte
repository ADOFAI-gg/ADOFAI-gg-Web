<script lang="ts">
	import { Container } from '@adofai-gg/ui'
	import LevelDetailHeader from '~/lib/components/levelDetail/LevelDetailHeader.svelte'
	import type { PageData } from './$types'
	import LevelMetadataArea from '~/lib/components/levelDetail/LevelMetadataArea.svelte'
	import LevelTagDisplay from '~/lib/components/levelDetail/LevelTagDisplay.svelte'
	import UserListPanel from '~/lib/components/UserListPanel.svelte'
	import type { UserListItemModel } from '@adofai-gg/ui'
	import { convertUser } from '~/lib/utils/converter'

	interface Props {
		data: PageData
	}

	const { data }: Props = $props()

	let creators = $derived(
		data.level.creators.map(
			(x) =>
				({
					type: 'user',
					data: convertUser(x, 'creator'),
					href: `/users/${x.id}`
				}) as UserListItemModel
		)
	)

	let artists = $derived(
		data.level.music.artists.map(
			(x) =>
				({
					type: 'user',
					data: convertUser(x, 'artist'),
					href: `/users/${x.id}`
				}) as UserListItemModel
		)
	)
</script>

<div class="level-detail-container">
	<LevelDetailHeader level={data.level} />
	<Container topMargin class="grid">
		<div class="main-content-area">
			<LevelMetadataArea level={data.level} />
		</div>
		<div class="meta-area">
			<LevelTagDisplay level={data.level} />
			<UserListPanel items={creators} title="level:artists" />
			<UserListPanel items={artists} title="level:creators" />
		</div>
	</Container>
</div>

<style lang="scss">
	@import '@adofai-gg/ui/dist/stylesheets/system/breakpoints';

	.level-detail {
		&-container {
			margin-top: -56px;
		}
	}

	.main-content-area {
		grid-column: span 12;
	}

	.meta-area {
		display: flex;
		flex-direction: column;
		grid-column: span 12;
		gap: 20px;
	}

	@include breakpoint('md') {
		.main-content-area {
			grid-column: span 8;
		}

		.meta-area {
			grid-column: span 4;
		}
	}

	@include breakpoint('lg') {
		.main-content-area {
			grid-column: span 9;
		}

		.meta-area {
			grid-column: span 3;
		}
	}
</style>
