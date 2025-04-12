<script lang="ts">
	import { Container, Tag } from '@adofai-gg/ui'
	import LevelDetailHeader from '~/lib/components/levelDetail/LevelDetailHeader.svelte'
	import type { PageData } from './$types'
	import LevelMetadataArea from '~/lib/components/levelDetail/LevelMetadataArea.svelte'
	import LevelTagDisplay from '~/lib/components/levelDetail/LevelTagDisplay.svelte'
	import UserListPanel from '~/lib/components/UserListPanel.svelte'
	import type { UserListItemModel } from '@adofai-gg/ui'
	import { convertUser } from '~/lib/utils/converter'
	import LevelActionsArea from '~/lib/components/levelDetail/LevelActionsArea.svelte'
	import Description from '~/lib/components/Description.svelte'

	interface Props {
		data: PageData
	}

	const { data }: Props = $props()

	let creators = $derived(
		data.level.creators.map(
			(x) =>
				({
					type: 'user',
					data: convertUser(x, 'creator')
					// href: `/users/${x.id}`
				}) as UserListItemModel
		)
	)

	let artists = $derived(
		data.level.music.artists.map(
			(x) =>
				({
					type: 'user',
					data: convertUser(x, 'artist')
					// href: `/users/${x.id}`
				}) as UserListItemModel
		)
	)

	const level = $derived(data.level)
</script>

<div class="level-detail-container">
	<LevelDetailHeader level={data.level} />
	<Container topMargin class="grid">
		<div class="title-area">
			<div class="label-container">
				{#if level.quality === 'LEGENDARY'}
					<Tag color="yellow">legendary</Tag>
				{:else if level.quality === 'FEATURED'}
					<Tag color="blue">recommended</Tag>
				{:else if level.quality === 'HIDDEN'}
					<Tag color="gray">hidden</Tag>
				{:else if level.quality === 'UNLISTED'}
					<Tag color="white">unlisted</Tag>
				{/if}
			</div>
			<div class="level-title">
				{level.title}
			</div>
		</div>
		<div class="main-content-area">
			<div class="main-upper-container">
				<LevelMetadataArea level={data.level} />
				<LevelActionsArea level={data.level} />
				<Description maxHeight={84}>{data.level.description}</Description>
			</div>
		</div>
		<div class="meta-area">
			<LevelTagDisplay level={data.level} />
			<UserListPanel items={artists} title="level:artists" />
			<UserListPanel items={creators} title="level:creators" />
		</div>
	</Container>
</div>

<style lang="scss">
	@use '@adofai-gg/ui/dist/stylesheets/system/breakpoints';

	.level-detail {
		&-container {
			margin-top: -56px;
		}
	}

	.main-content-area,
	.title-area {
		grid-column: span 12;
	}

	.meta-area {
		display: flex;
		flex-direction: column;
		grid-column: span 12;
		gap: 20px;
	}

	@include breakpoints.breakpoint('md') {
		.main-content-area {
			grid-column: span 8;
		}

		.meta-area {
			grid-column: span 4;
		}
	}

	@include breakpoints.breakpoint('lg') {
		.main-content-area {
			grid-column: span 9;
		}

		.meta-area {
			grid-column: span 3;
		}
	}

	.main-upper-container {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.label-container {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.level-title {
		margin-top: 6px;
		font-weight: 500;
		font-size: 36px;
		line-height: 140%;
	}
</style>
