<button class="rating-item">
	<div class="status-row">
		<div class="status noni">논의 필요</div>
		<div class="expected">초고렙(예상 21.6)</div>
		<div class="id">3963</div>
	</div>
	<div>끼야아아악</div>
</button>

<style lang="scss">
	@use '@adofai-gg/ui/dist/stylesheets/system/colors' as *;

	.status-row {
		display: flex;
		font-size: 16px;
		gap: 8px;
	}

	.status {
		font-weight: 700;

		&.noni {
			color: $yellow;
		}
	}

	.expected {
		opacity: 0.6;
	}

	.id {
		&::before {
			content: '#';
		}

		opacity: 0.6;
	}

	.rating-item {
		display: flex;
		flex-direction: column;
		text-align: left;
		padding: 16px;
		gap: 4px;
		border-radius: 8px;
		width: 100%;

		transition: background ease 0.2s;

		&:hover {
			background: rgba($darkblue, 0.2);
		}

		&:active {
			background: rgba($darkblue, 0.3);
		}
	}
</style>
