<script lang="ts">
	import { Button, Translation, type User } from '@adofai-gg/ui'
	import RatingCommentList from './rating-comment-list.svelte'

	let tab = $state<'info' | 'note' | 'others'>('info')

	interface Props {
		user: User
	}

	const { user }: Props = $props()
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
		<button
			class="tab"
			class:active={tab === 'note'}
			onclick={() => {
				tab = 'note'
			}}
		>
			<Translation key="manage:notes" />
		</button>
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
			An Ominous Unknown Object Flying Over Kansas City, Missouri at a Steady Speed of 299,727,458
			MPH (WYSI) Blasting Rhythm Game Music on a Chilly Friday Evening In the Middle of January
		</div>

		<div class="card">
			<div class="card-title">
				<Translation key="level:artists" />
			</div>
		</div>

		<div class="card">
			<div class="card-title">
				<Translation key="level:creators" />
			</div>
		</div>

		<div class="actions">
			<Button variant="outlined" size="lg" leftIcon="fileDownload">
				<Translation key="level:download" />
			</Button>
			<Button size="lg" leftIcon="steam" variant="ghost-dark">
				<Translation key="level:workshop" />
			</Button>
		</div>

		<div class="description">
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, minima. Ullam optio hic
			repellendus, aperiam corporis odit cumque eveniet veniam quidem impedit magnam dolorem, quas
			explicabo laudantium quos fugit aliquid.
		</div>
	{:else if tab === 'note'}
		<RatingCommentList {user} />
	{:else if tab === 'others'}
		other status
	{/if}
</div>

<style lang="scss">
	.details-section {
		width: 400px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.tabs {
		display: flex;
	}

	.title {
		font-size: 20px;
		font-weight: 500;
	}

	.card {
		gap: 8px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 12px;
		padding: 16px;
	}

	.description {
		font-size: 15px;
	}

	.card-title {
		font-size: 14px;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.6);
		user-select: none;
	}

	.actions {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}

	.tab {
		white-space: nowrap;
		padding: 8px 16px;
		box-sizing: border-box;

		&.active {
			padding-bottom: 6px;
			border-bottom: 2px solid #ffffff;
		}
	}
</style>
