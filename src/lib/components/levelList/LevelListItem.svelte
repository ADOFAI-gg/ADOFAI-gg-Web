<script lang="ts">
	import type { APILevel } from '~/lib/types'
	import DifficultyIcon from '../DifficultyIcon.svelte'
	import LevelListItemUserList from './LevelListItemUserList.svelte'
	import { getDifficulty, getDownloadUrl, getTags } from '~/lib/utils/level'
	import { getGlobalContext, Icon } from '@adofai-gg/ui'
	import TagIcon from '../TagIcon.svelte'

	interface Props {
		level: APILevel
		noDivider?: boolean
		noLink?: boolean
		noDownload?: boolean
	}

	const { level, noDivider = false, noLink = false, noDownload = false }: Props = $props()

	const { language } = getGlobalContext()

	let fmt = $derived(Intl.NumberFormat($language, { notation: 'compact' }))

	let likes = $derived(fmt.format(0))
	const downloadUrl = $derived(getDownloadUrl(level))
</script>

{#snippet content()}
	<div class="id-difficulty-area">
		<DifficultyIcon display size={48} difficulty={getDifficulty(level)} />
		<div class="level-id">#{level.id}</div>
	</div>
	<div class="metadata-area">
		<div class="level-title">{level.title}</div>
		<div class="credits-area">
			<LevelListItemUserList icon="music" users={level.music.artists} />
			<LevelListItemUserList icon="chart" users={level.creators} alias={level.creatorAlias} />
		</div>
	</div>
	<div class="extra-area">
		<!-- <div class="likes">
				<Icon icon="heartOutlined" size={18} alt="likes" />
				{likes}
			</div> -->
		<div class="tags">
			{#if level.quality === 'FEATURED'}
				<TagIcon size={24} tag="FEATURED" />
			{:else if level.quality === 'LEGENDARY'}
				<TagIcon size={24} tag="LEGENDARY" />
			{/if}
			{#each getTags(level) as tag}
				<TagIcon size={24} {tag} />
			{/each}
		</div>
	</div>

	{#if !noDownload}
		<button
			class="download-button"
			onclick={(e) => {
				e.preventDefault()
				if (downloadUrl) window.open(downloadUrl, '_blank')
			}}
		>
			<Icon alt="download" icon="fileDownload" size={48} />
		</button>
	{/if}
{/snippet}

{#if noLink}
	<div class="level-list-item">
		{@render content()}
	</div>
{:else}
	<a href="/levels/{level.id}" class="level-list-item" class:has-divider={!noDivider}>
		{@render content()}
	</a>
{/if}

<style lang="scss">
	@use '@adofai-gg/ui/dist/stylesheets/system/breakpoints' as *;

	.level-list-item {
		--bg-opacity: 0;

		display: flex;
		gap: 16px;
		align-items: center;
		padding: 18px 16px;
		background-color: rgba(0, 0, 0, var(--bg-opacity));
		transition: background-color ease 0.2s;
	}

	a.level-list-item {
		&:hover {
			--bg-opacity: 0.1;
		}

		&:active {
			--bg-opacity: 0.2;
		}
	}

	.has-divider {
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
		font-size: 12px;
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
		align-items: flex-end;
	}

	.tags {
		display: flex;
		gap: 4px;
	}

	/* .likes {
		display: flex;
		gap: 2px;
		align-items: center;
		font-weight: 500;
		font-size: 16px;
	} */

	.download-button {
		display: none;

		@include breakpoint('md') {
			display: block;
		}
	}
</style>
