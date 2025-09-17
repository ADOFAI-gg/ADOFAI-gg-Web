<script lang="ts">
	import type { APILevel } from '~/lib/types'
	import Video from '../Video.svelte'
	import DifficultyIcon from '../DifficultyIcon.svelte'
	import LevelStat from './LevelStat.svelte'
	import { Translation } from '@adofai-gg/ui'
	import { getDifficulty } from '~/lib/utils/level'
	import { formatBPM } from '~/lib'

	interface Props {
		level: APILevel
	}

	const { level }: Props = $props()

	const tiles = $derived(level.tile.toLocaleString())

	const bpm = $derived.by(() => {
		return formatBPM(level.minBpm, level.maxBpm)
	})
</script>

<div class="level-metadata-area">
	<Video url={level.videoUrl} />

	<div class="details-area">
		<DifficultyIcon size={48} difficulty={getDifficulty(level)} />
		<!-- <LevelStat key="level:song-length">TODO</LevelStat> -->
		<LevelStat key="level:bpm">
			{#if bpm}
				{bpm}
			{:else}
				<Translation key="common:unknown" />
			{/if}
		</LevelStat>
		<LevelStat key="level:tiles">{tiles}</LevelStat>
		<div class="spacer"></div>
		<div class="extra-area">
			<span class="level-id">#{level.id}</span>
		</div>
	</div>
</div>

<style lang="scss">
	@use '@adofai-gg/ui/dist/stylesheets/system/colors';

	.level-metadata-area {
		overflow: hidden;
		border-radius: 12px;
		background-color: rgba(colors.$darkblue, 0.2);
	}

	.details-area {
		display: flex;
		flex-wrap: wrap;
		gap: 24px;
		align-items: center;
		padding: 24px;
	}

	.spacer {
		flex-grow: 1;
		margin-right: -24px;
		margin-left: -24px;
	}

	.extra-area {
		display: flex;
		gap: 8px;
	}

	.level-id {
		color: rgba(255, 255, 255, 0.4);
	}
</style>
