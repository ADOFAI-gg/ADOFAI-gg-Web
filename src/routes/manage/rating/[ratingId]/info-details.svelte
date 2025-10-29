<script lang="ts">
	import { Button, Comment, Translation, UserList, type User } from '@adofai-gg/ui'
	import RatingCommentList from '../rating-comment-list.svelte'
	import type { APILevel, APILevelRating } from '~/lib'
	import { artistListModel, creatorListModel } from '~/lib/utils/list.svelte'
	import { getDownloadUrl } from '~/lib/utils/level'
	import { convertUser } from '~/lib/utils/converter'
	import DifficultyIcon from '~/lib/components/DifficultyIcon.svelte'

	let tab = $state<'info' | 'note' | 'others'>('info')

	interface Props {
		user: User
		rating: APILevelRating
		level: APILevel
	}

	const { user, rating, level }: Props = $props()

	let artists = artistListModel(() => level)
	let creators = creatorListModel(() => level)

	const downloadUrl = $derived(getDownloadUrl(level))
</script>

<div class="details-section">
	<div class="tabs">
		<button
			class="tab"
			class:active={tab === 'info'}
			onclick={() => {
				tab = 'info'
			}}
		>
			<Translation key="manage:level-info" />
		</button>
		<!-- <button
			class="tab"
			class:active={tab === 'note'}
			onclick={() => {
				tab = 'note'
			}}
		>
			<Translation key="manage:notes" />
		</button> -->
		<button
			class="tab"
			class:active={tab === 'others'}
			onclick={() => {
				tab = 'others'
			}}
		>
			<Translation key="manage:other-rating-status" />
		</button>
	</div>
	{#if tab === 'info'}
		<div class="title">
			{level.title}
		</div>

		<div class="card">
			<div class="card-title">
				<Translation key="level:artists" />
			</div>

			<div class="card-content">
				<UserList items={artists} />
			</div>
		</div>

		<div class="card">
			<div class="card-title">
				<Translation key="level:creators" />
			</div>

			<div class="card-content">
				<UserList items={creators} />
			</div>
		</div>

		<div class="actions">
			{#if downloadUrl}
				<a href={downloadUrl} rel="noreferrer" target="_blank">
					<Button size="lg" leftIcon="fileDownload" variant="outlined">
						<Translation key="level:download" />
					</Button>
				</a>
			{/if}
			{#if level.workshopUrl?.trim()}
				<a href={level.workshopUrl.trim()} rel="noreferrer" target="_blank">
					<Button size="lg" leftIcon="steam" variant="ghost-dark">
						<Translation key="level:workshop" />
					</Button>
				</a>
			{/if}
		</div>

		<div class="description">
			{level.description}
		</div>
	{:else if tab === 'note'}
		<RatingCommentList {user} />
	{:else if tab === 'others'}
		{#each rating.reviews as review}
			<Comment author={convertUser(review.reviewer, 'creator')}>
				<DifficultyIcon size={40} difficulty={review.difficulty} />
			</Comment>
		{/each}
	{/if}
</div>

<style lang="scss">
	.details-section {
		display: flex;
		flex-direction: column;
		gap: 16px;
		width: 400px;
	}

	.tabs {
		display: flex;
	}

	.title {
		font-weight: 500;
		font-size: 20px;
	}

	.card {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 16px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 12px;
	}

	.description {
		font-size: 15px;
	}

	.card-title {
		color: rgba(255, 255, 255, 0.6);
		font-weight: 600;
		font-size: 14px;
		user-select: none;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.tab {
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding: 8px 16px;
		border-radius: 8px;
		white-space: nowrap;
		transition: background-color ease 0.2s;

		&.active {
			background-color: rgba(255, 255, 255, 0.1);
		}
	}
</style>
