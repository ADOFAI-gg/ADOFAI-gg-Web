<script lang="ts">
	import { Button, Translation } from '@adofai-gg/ui'
	import DifficultyIcon from '~/lib/components/DifficultyIcon.svelte'
	import LevelStat from '~/lib/components/levelDetail/LevelStat.svelte'
	import TagIcon from '~/lib/components/TagIcon.svelte'

	import Video from '~/lib/components/Video.svelte'
</script>

<div class="main-section">
	<div class="metadata-area">
		<Video url="https://www.youtube.com/watch?v=-VITOjLP7Us" />
		<div class="stat-area">
			<LevelStat key="manage:rating-expected">
				<div class="difficulty-stat">
					<DifficultyIcon difficulty={14} size={28} />
				</div>
			</LevelStat>
			<LevelStat key="manage:rating-final">
				<div class="difficulty-stat">
					<DifficultyIcon difficulty={0} size={28} />
				</div>
			</LevelStat>
			<LevelStat key="manage:rating-quality">wow</LevelStat>
			<LevelStat key="manage:rating-status">5/7</LevelStat>
			<LevelStat key="manage:rating-song-length">4:32</LevelStat>
			<LevelStat key="manage:rating-bpm">120-170</LevelStat>
			<LevelStat key="manage:rating-tiles">1,425</LevelStat>
			<div class="spacer"></div>
			<div class="level-id">2412</div>
			<div class="tags">
				<TagIcon tag="EPILEPSY_WARNING" size={26} />
				<TagIcon tag="DLC" size={26} />
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
		flex-grow: 1;
		width: 0;
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.metadata-area {
		overflow: hidden;
		border-radius: 12px;
	}

	.stat-area {
		width: 100%;
		padding: 16px;
		background: rgba($darkblue, 0.2);
		display: flex;
		gap: 16px;
		flex-wrap: wrap;
	}

	.spacer {
		flex-grow: 1;
	}

	.difficulty-stat {
		height: 32px;
		display: flex;
		align-items: center;
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
		gap: 8px;
	}
</style>
