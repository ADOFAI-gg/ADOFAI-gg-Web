<script lang="ts">
	import { Container } from '@adofai-gg/ui'
	import LevelDetailHeader from '~/lib/components/levelDetail/LevelDetailHeader.svelte'
	import type { PageData } from './$types'
	import LevelMetadataArea from '~/lib/components/levelDetail/LevelMetadataArea.svelte'
	import LevelTagDisplay from '~/lib/components/levelDetail/LevelTagDisplay.svelte'

	interface Props {
		data: PageData
	}

	const { data }: Props = $props()
</script>

<div class="level-detail-container">
	<LevelDetailHeader level={data.level} />
	<Container topMargin class="grid">
		<div class="main-content-area">
			<LevelMetadataArea level={data.level} />
		</div>
		<div class="meta-area">
			<LevelTagDisplay level={data.level} />
		</div>
	</Container>
</div>

<style lang="scss">
	@import '@adofai-gg/ui/dist/stylesheets/system/breakpoints';

	.level-detail {
		&-container {
			margin-top: -56px;
		}
	}

	.main-content-area {
		grid-column: span 12;
	}

	.meta-area {
		grid-column: span 12;
	}

	@include breakpoint('md') {
		.main-content-area {
			grid-column: span 8;
		}

		.meta-area {
			grid-column: span 4;
		}
	}

	@include breakpoint('lg') {
		.main-content-area {
			grid-column: span 9;
		}

		.meta-area {
			grid-column: span 3;
		}
	}
</style>
