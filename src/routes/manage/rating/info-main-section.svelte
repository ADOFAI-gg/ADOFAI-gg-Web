<script lang="ts">
	import { Button, Translation } from '@adofai-gg/ui'
	import { formatBPM, type APILevelRating } from '~/lib'
	import DifficultyIcon from '~/lib/components/DifficultyIcon.svelte'
	import LevelStat from '~/lib/components/levelDetail/LevelStat.svelte'
	import TagIcon from '~/lib/components/TagIcon.svelte'

	import Video from '~/lib/components/Video.svelte'

	interface Props {
		rating: APILevelRating
	}

	const { rating }: Props = $props()

	const bpm = $derived(formatBPM(rating.level.minBpm, rating.level.maxBpm))
</script>

<div class="main-section">
	<div class="metadata-area">
		<Video url={rating.level.videoUrl} />
		<div class="stat-area">
			<LevelStat key="manage:rating-expected">
				<div class="difficulty-stat">
					<DifficultyIcon difficulty={rating.expectDifficulty} size={28} />
				</div>
			</LevelStat>
			<LevelStat key="manage:rating-final">
				<div class="difficulty-stat">
					<DifficultyIcon difficulty={rating.finalDifficulty ?? 0} size={28} />
				</div>
			</LevelStat>
			<LevelStat key="manage:rating-quality">wow</LevelStat>
			<LevelStat key="manage:rating-status">5/7</LevelStat>
			<LevelStat key="manage:rating-song-length">4:32</LevelStat>
			<LevelStat key="manage:rating-bpm">{bpm}</LevelStat>
			<LevelStat key="manage:rating-tiles">{rating.level.tile}</LevelStat>
			<div class="spacer"></div>
			<div class="level-id">{rating.id}</div>
			<div class="tags">
				{#if rating.level.epilepsyWarning}
					<TagIcon tag="EPILEPSY_WARNING" size={26} />
				{/if}
				<!-- {#if rating.level.tags.find((x) => x.name === 'DLC')} -->
				<TagIcon tag="DLC" size={26} />
				<!-- {/if} -->
			</div>
		</div>
	</div>
	<div class="actions-area">
		<Button>
			<Translation key="manage:rating-add" />
		</Button>
		<Button variant="outlined">
			<Translation key="manage:rating-set-quality" />
		</Button>
		<Button variant="outlined">
			<Translation key="manage:rating-set-expected" />
		</Button>
		<Button variant="outlined-danger">
			<Translation key="manage:rating-force-confirm" />
		</Button>
		<Button variant="ghost-dark" leftIcon="check">
			<Translation key="manage:rating-mark-discussion-needed" />
		</Button>
	</div>
</div>

<style lang="scss">
	@use '@adofai-gg/ui/dist/stylesheets/system/colors' as *;

	.main-section {
		display: flex;
		flex-grow: 1;
		flex-direction: column;
		gap: 16px;
		width: 0;
		min-width: 480px;
		height: 100%;
	}

	.metadata-area {
		overflow: hidden;
		border-radius: 12px;
	}

	.stat-area {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		width: 100%;
		padding: 16px;
		background: rgba($darkblue, 0.2);
	}

	.spacer {
		flex-grow: 1;
	}

	.difficulty-stat {
		display: flex;
		align-items: center;
		height: 32px;
	}

	.tags {
		display: flex;
		gap: 8px;
		align-items: center;
	}

	.level-id {
		display: flex;
		align-items: center;
		color: rgba(255, 255, 255, 0.4);

		&::before {
			content: '#';
		}
	}

	.actions-area {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
</style>
