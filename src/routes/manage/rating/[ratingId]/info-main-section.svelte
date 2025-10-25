<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import {
		Button,
		getGlobalContext,
		PopoverSelect,
		Tag,
		translate,
		translateKey,
		Translation
	} from '@adofai-gg/ui'
	import { api, formatBPM, ky, type APILevel, type APILevelRating, type APIMember } from '~/lib'
	import DifficultyIcon from '~/lib/components/DifficultyIcon.svelte'
	import LevelStat from '~/lib/components/levelDetail/LevelStat.svelte'
	import TagIcon from '~/lib/components/TagIcon.svelte'
	import ActionContainer from '~/lib/components/utils/ActionContainer.svelte'

	import Video from '~/lib/components/Video.svelte'
	import { difficultyOptionsWithRange } from '~/lib/utils/difficulty'
	import { encode } from '~/lib/utils/encode'

	interface Props {
		rating: APILevelRating
		level: APILevel
		me: APIMember | null
	}

	const { rating, me, level }: Props = $props()

	const bpm = $derived(formatBPM(rating.level.minBpm, rating.level.maxBpm))
	const { language } = getGlobalContext()

	let myReview = $derived(me ? (rating.reviews.find((x) => x.reviewer.id === me.id) ?? null) : null)

	const qualityOptions = {
		options: [
			{
				label: translateKey($language, 'manage:unset'),
				value: 'unset'
			},
			{
				label: 'Unlisted',
				value: 'UNLISTED'
			},
			{
				label: 'Hidden',
				value: 'HIDDEN'
			},
			{
				label: 'Listed',
				value: 'LISTED'
			},
			{
				label: 'Recommended',
				value: 'FEATURED',
				icon: 'FEATURED'
			},
			{
				label: 'Legendary',
				value: 'LEGENDARY',
				icon: 'LEGENDARY'
			}
		]
	}
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
			<LevelStat key="manage:rating-absolute">
				<div class="difficulty-stat">
					<DifficultyIcon difficulty={rating.finalAbsoluteDifficulty ?? 0} size={28} />
				</div>
			</LevelStat>
			<LevelStat key="manage:rating-category">
				{#if rating.finalQuality}
					{@const quality = rating.finalQuality}

					{#if quality === 'LEGENDARY'}
						<Tag color="yellow">legendary</Tag>
					{:else if quality === 'FEATURED'}
						<Tag color="blue">recommended</Tag>
					{:else if quality === 'HIDDEN'}
						<Tag color="gray">hidden</Tag>
					{:else if quality === 'LISTED'}
						<Tag color="darkblue">listed</Tag>
					{:else if quality === 'UNLISTED'}
						<Tag color="white">unlisted</Tag>
					{/if}
				{:else}
					X
				{/if}
			</LevelStat>
			<LevelStat key="manage:rating-status">{rating.reviews.length}/TODO</LevelStat>
			<LevelStat key="manage:rating-bpm">{bpm}</LevelStat>
			<LevelStat key="manage:rating-tiles">{rating.level.tile}</LevelStat>
			<div class="spacer"></div>
			<div class="level-id">{rating.id}</div>
			<div class="tags">
				{#if rating.level.epilepsyWarning}
					<TagIcon tag="EPILEPSY_WARNING" size={26} />
				{/if}
				{#if level.tags.find((x) => x.name === 'DLC')}
					<TagIcon tag="DLC" size={26} />
				{/if}
			</div>
		</div>
	</div>

	<div class="actions-area">
		<div class="action-row">
			<div class="action-row-title">
				<Translation key="manage:rating-action-difficulty" />
			</div>
			<div class="action-row-content">
				<ActionContainer
					action={async (value: number) => {
						if (!me) throw new Error('user is required to run this action')

						await ky.patch(api.forum(encode`levels/ratings/${rating.id}/reviews/${me.id}`), {
							json: {
								difficulty: value
							}
						})

						await invalidateAll()
					}}
				>
					{#snippet children({ run, running })}
						<PopoverSelect
							items={difficultyOptionsWithRange($language)}
							select
							value={myReview?.difficulty?.toString()}
							onSelect={(value) => {
								run(Number(value))
							}}
						>
							{#snippet trigger(trigger)}
								<Button meltElement={trigger} disabled={running}>
									{#if myReview}
										<DifficultyIcon difficulty={myReview.difficulty} size={24} />
									{/if}
									<Translation key="manage:rating-add" />
								</Button>
							{/snippet}

							{#snippet iconTemplate({ customData })}
								<DifficultyIcon difficulty={customData!.numValue} size={18} />
							{/snippet}
						</PopoverSelect>
					{/snippet}
				</ActionContainer>

				<ActionContainer
					action={async (value: number) => {
						if (!me) throw new Error('user is required to run this action')

						await ky.patch(api.forum(encode`levels/ratings/${rating.id}/reviews/${me.id}`), {
							json: {
								absoluteDifficulty: value
							}
						})

						await invalidateAll()
					}}
				>
					{#snippet children({ run, running })}
						<PopoverSelect
							items={difficultyOptionsWithRange($language)}
							select
							onSelect={(value) => {
								run(Number(value))
							}}
						>
							{#snippet trigger(trigger)}
								<Button variant="outlined" meltElement={trigger} disabled={running}>
									{#if myReview}
										<DifficultyIcon difficulty={myReview.absoluteDifficulty ?? 0} size={24} />
									{/if}
									<Translation key="manage:rating-set-abs-difficulty" />
								</Button>
							{/snippet}

							{#snippet iconTemplate({ customData })}
								<DifficultyIcon difficulty={customData!.numValue} size={18} />
							{/snippet}
						</PopoverSelect>
					{/snippet}
				</ActionContainer>

				<ActionContainer
					action={async (value: number) => {
						await ky.patch(api.forum(encode`levels/ratings/${rating.id}`), {
							json: {
								expectedDifficulty: value
							}
						})

						await invalidateAll()
					}}
				>
					{#snippet children({ run, running })}
						<PopoverSelect
							items={difficultyOptionsWithRange($language)}
							select
							onSelect={(value) => {
								run(Number(value))
							}}
						>
							{#snippet trigger(trigger)}
								<!-- <Button variant="ghost-dark" meltElement={trigger} disabled={running}>
									<Translation key="manage:rating-set-expected" />
								</Button> -->
								<Button variant="ghost-dark" meltElement={trigger} disabled={running || true}>
									<Translation key="manage:rating-set-expected" />
								</Button>
							{/snippet}

							{#snippet iconTemplate({ customData })}
								<DifficultyIcon difficulty={customData!.numValue} size={18} />
							{/snippet}
						</PopoverSelect>
					{/snippet}
				</ActionContainer>

				<ActionContainer
					action={async (value: number) => {
						await ky.patch(api.forum(`levels/ratings/${encodeURIComponent(rating.id)}`), {
							json: {
								finalDifficulty: value
							}
						})

						await invalidateAll()
					}}
				>
					{#snippet children({ run, running })}
						<PopoverSelect
							items={[
								{
									options: [
										{
											label: translateKey($language, 'manage:reset-difficulty'),
											value: '0',
											customData: { numValue: 0 }
										}
									]
								},
								...difficultyOptionsWithRange($language)
							]}
							value={`${rating.finalDifficulty || '0'}`}
							select
							onSelect={(v) => {
								run(Number(v))
							}}
						>
							{#snippet trigger(trigger)}
								<Button variant="ghost-danger" meltElement={trigger} disabled={running}>
									<Translation key="manage:rating-force-confirm" />
								</Button>
							{/snippet}

							{#snippet iconTemplate({ customData })}
								<DifficultyIcon difficulty={customData!.numValue} size={18} />
							{/snippet}
						</PopoverSelect>
					{/snippet}
				</ActionContainer>

				<ActionContainer
					action={async (value: number) => {
						await ky.patch(api.forum(`levels/ratings/${encodeURIComponent(rating.id)}`), {
							json: {
								finalAbsoluteDifficulty: value
							}
						})

						await invalidateAll()
					}}
				>
					{#snippet children({ run, running })}
						<PopoverSelect
							items={[
								{
									options: [
										{
											label: translateKey($language, 'manage:reset-difficulty'),
											value: '0',
											customData: { numValue: 0 }
										}
									]
								},
								...difficultyOptionsWithRange($language)
							]}
							value={`${rating.finalAbsoluteDifficulty || '0'}`}
							select
							onSelect={(v) => {
								run(Number(v))
							}}
						>
							{#snippet trigger(trigger)}
								<Button variant="ghost-danger" meltElement={trigger} disabled={running}>
									<Translation key="manage:rating-abs-difficulty-force-confirm" />
								</Button>
							{/snippet}

							{#snippet iconTemplate({ customData })}
								<DifficultyIcon difficulty={customData!.numValue} size={18} />
							{/snippet}
						</PopoverSelect>
					{/snippet}
				</ActionContainer>
			</div>
		</div>

		<div class="action-row">
			<div class="action-row-title">
				<Translation key="manage:rating-action-quality" />
			</div>
			<div class="action-row-content">
				<ActionContainer
					action={async (value: string) => {
						if (!me) throw new Error('user is required to run this action')

						await ky.patch(api.forum(encode`levels/ratings/${rating.id}/reviews/${me.id}`), {
							json: {
								quality: value
							}
						})

						await invalidateAll()
					}}
				>
					{#snippet children({ run, running })}
						<PopoverSelect select onSelect={run} value={myReview?.quality} items={[qualityOptions]}>
							{#snippet trigger(trigger)}
								<Button variant="outlined" meltElement={trigger} disabled={running}>
									<Translation key="manage:rating-set-quality" />
								</Button>
							{/snippet}

							{#snippet iconTemplate({ icon })}
								{#if icon}
									<TagIcon size={16} noTooltip tag={icon} />
								{/if}
							{/snippet}
						</PopoverSelect>
					{/snippet}
				</ActionContainer>

				<ActionContainer
					action={async (value: string) => {
						await ky.patch(api.forum(`levels/ratings/${encodeURIComponent(rating.id)}`), {
							json: {
								finalQuality: value
							}
						})

						await invalidateAll()
					}}
				>
					{#snippet children({ run, running })}
						<PopoverSelect
							items={[qualityOptions]}
							select
							value={level.quality}
							onSelect={(v) => {
								run(v)
							}}
						>
							{#snippet trigger(trigger)}
								<Button variant="ghost-danger" meltElement={trigger} disabled={running}>
									<Translation key="manage:rating-quality-force-confirm" />
								</Button>
							{/snippet}

							{#snippet iconTemplate({ icon })}
								{#if icon}
									<TagIcon size={16} noTooltip tag={icon} />
								{/if}
							{/snippet}
						</PopoverSelect>
					{/snippet}
				</ActionContainer>
			</div>
		</div>

		<div class="action-row">
			<div class="action-row-title">
				<Translation key="manage:rating-action-metadata" />
			</div>
			<div class="action-row-content">
				<ActionContainer
					action={async () => {
						await ky.patch(api.forum(`levels/ratings/${encodeURIComponent(rating.id)}`), {
							json: {
								requiresDiscussion: !rating.requiresDiscussion
							}
						})

						await invalidateAll()
					}}
				>
					{#snippet children({ run, running })}
						<Button variant="ghost-dark" leftIcon="check" disabled={running} onclick={run}>
							<Translation key="manage:rating-mark-discussion-needed" />
						</Button>
					{/snippet}
				</ActionContainer>

				<ActionContainer
					action={async () => {
						await ky.patch(api.forum(`levels/ratings/${encodeURIComponent(rating.id)}`), {
							json: {
								// TODO clearCondition
							}
						})

						await invalidateAll()
					}}
				>
					{#snippet children({ run, running })}
						<Button variant="ghost-dark" disabled={running || true} onclick={run}>
							<Translation key="manage:rating-set-clear-condition" />
						</Button>
					{/snippet}
				</ActionContainer>

				<ActionContainer
					action={async () => {
						await ky.patch(api.forum(`levels/ratings/${encodeURIComponent(rating.id)}`), {
							json: {
								// TODO tags
							}
						})

						await invalidateAll()
					}}
				>
					{#snippet children({ run, running })}
						<Button variant="ghost-dark" disabled={running || true} onclick={run}>
							<Translation key="manage:rating-set-tags" />
						</Button>
					{/snippet}
				</ActionContainer>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@use '@adofai-gg/ui/dist/stylesheets/system/colors' as *;

	.main-section {
		display: flex;
		flex-grow: 1;
		flex-direction: column;
		gap: 16px;
		overflow: scroll;
		width: 0;
		min-width: 480px;
		height: 100%;
	}

	.metadata-area {
		overflow: clip;
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
		color: rgb(255, 255, 255, 0.4);

		&::before {
			content: '#';
		}
	}

	.actions-area {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.action-row {
		display: flex;
	}

	.action-row-title {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 120px;
		border-radius: 8px 0 0 8px;
		background-color: rgb(255, 255, 255, 0.2);
		font-weight: 600;
		font-size: 16px;
		text-align: center;
	}

	.action-row-content {
		display: flex;
		flex-grow: 1;
		flex-wrap: wrap;
		gap: 8px;
		padding: 8px;
		border: 1px solid rgb(255, 255, 255, 0.2);
		border-radius: 0 8px 8px 0;

		& > :global(*) {
			height: 48px;
		}
	}
</style>
