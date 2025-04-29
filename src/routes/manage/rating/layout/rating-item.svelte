<script lang="ts">
	import { page } from '$app/state'
	import { Translation } from '@adofai-gg/ui'
	import type { APILevelRating } from '~/lib'
	import { getRatingStatus } from '~/lib/utils/rating'

	interface Props {
		rating: APILevelRating
	}

	const { rating }: Props = $props()
	const status = $derived(getRatingStatus(rating))
	const selected = $derived(page.params.levelId === rating.id.toString())
</script>

<a href="/manage/rating/{rating.id}" class="rating-item rating-status-{status}" class:selected>
	<div class="status-row">
		<div class="status">
			<Translation key="manage:rating-status-{status}" />
		</div>
		<div class="expected">{rating.difficultyRange} {rating.expectDifficulty}</div>
		<div class="id">{rating.id}</div>
	</div>
	<div>{rating.level.title}</div>
</a>

<style lang="scss">
	@use '@adofai-gg/ui/dist/stylesheets/system/colors' as *;

	.status {
		color: rgba(204, 204, 204, 1);
		font-weight: 700;
	}

	.rating-status-discussionNeeded {
		.status {
			color: $yellow;
		}
	}

	.rating-status-completed,
	.rating-status-confirmNeeded {
		opacity: 0.4;
	}

	.status-row {
		display: flex;
		gap: 8px;
		font-size: 16px;
	}

	.expected {
		opacity: 0.6;
	}

	.id {
		opacity: 0.6;

		&::before {
			content: '#';
		}
	}

	.rating-item {
		display: flex;
		flex-direction: column;
		gap: 4px;
		width: 100%;
		padding: 16px;
		border-radius: 8px;
		text-align: left;
		transition: background ease 0.2s;

		&:hover,
		&:focus {
			background: rgba($darkblue, 0.2);
		}

		&:active {
			background: rgba($darkblue, 0.4);
		}

		&.selected {
			background: rgba($darkblue, 0.2);

			&:hover,
			&:focus {
				background: rgba($darkblue, 0.4);
			}

			&:active {
				background: rgba($darkblue, 0.6);
			}
		}
	}
</style>
