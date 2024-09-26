<script lang="ts">
	import { Container, Tag } from '@adofai-gg/ui'
	import type { APILevel } from '~/lib/types'
	import { getLevelThumbnail } from '~/lib/utils/parser'

	interface Props {
		level: APILevel
	}

	const { level }: Props = $props()

	let thumbnailUrl = $derived(getLevelThumbnail(level))
</script>

<div
	class="level-detail-header"
	style={thumbnailUrl ? `--background-image: url('${thumbnailUrl}')` : ''}
>
	<Container>
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
	</Container>
</div>

<style lang="scss">
	.level-detail-header {
		padding-top: 192px;
		padding-bottom: 32px;
		background: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
			var(--background-image);
		background-position: center;
		background-size: cover;
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
