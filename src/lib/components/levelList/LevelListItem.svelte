<script lang="ts">
	import type { APILevel } from '~/lib/types'
	import DifficultyIcon from '../DifficultyIcon.svelte'
	import LevelListItemUserList from './LevelListItemUserList.svelte'
	import { getDifficulty, getTags } from '~/lib/utils/level'
	import { Icon } from '@adofai-gg/ui'
	import TagIcon from '../TagIcon.svelte'

	interface Props {
		level: APILevel
	}

	const { level }: Props = $props()
</script>

<a href="/levels/{level.id}" class="level-list-item">
	<div class="id-difficulty-area">
		<DifficultyIcon size={48} difficulty={getDifficulty(level)} />
		<div class="level-id">#{level.id}</div>
	</div>
	<div class="metadata-area">
		<div class="level-title">{level.title}</div>
		<div class="credits-area">
			<LevelListItemUserList icon="music" users={level.creators} />
			<LevelListItemUserList icon="chart" users={level.creators} />
		</div>
	</div>
	<div class="extra-area">
		<div class="tags">
			{#each getTags(level) as tag}
				<TagIcon size={24} {tag} />
			{/each}
		</div>
	</div>
	<button
		class="download-button"
		onclick={(e) => {
			e.preventDefault()
			if (level.downloadUrl) window.open(level.downloadUrl, '_blank')
		}}
	>
		<Icon alt="download" icon="fileDownload" size={48} />
	</button>
</a>

<style lang="scss">
	.level-list-item {
		--bg-opacity: 0;

		display: flex;
		gap: 16px;
		align-items: center;
		padding: 18px 16px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		background-color: rgba(0, 0, 0, var(--bg-opacity));
		transition: background-color ease 0.2s;

		&:hover {
			--bg-opacity: 0.1;
		}

		&:active {
			--bg-opacity: 0.2;
		}
	}

	.id-difficulty-area {
		display: flex;
		flex-direction: column;
		gap: 4px;
		align-items: center;
		text-align: center;
	}

	.level-id {
		color: rgba(255, 255, 255, 0.4);
		font-weight: 12px;
		line-height: 120%;
	}

	.metadata-area {
		display: flex;
		flex-grow: 1;
		flex-direction: column;
		gap: 4px;
	}

	.level-title {
		font-weight: 500;
		font-size: 22px;
		line-height: 120%;
	}

	.credits-area {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.extra-area {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.tags {
		display: flex;
		gap: 4px;
	}
</style>
