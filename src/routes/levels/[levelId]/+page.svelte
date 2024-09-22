<script lang="ts">
	import { Container } from '@adofai-gg/ui'
	import LevelDetailHeader from '~/lib/components/levelDetail/LevelDetailHeader.svelte'
	import type { PageData } from './$types'

	interface Props {
		data: PageData
	}

	const { data }: Props = $props()
</script>

<div class="level-detail-container">
	<LevelDetailHeader level={data.level} />
	<Container>Level detail</Container>
</div>

<style lang="scss">
	.level-detail {
		&-container {
			margin-top: -56px;
		}
	}
</style>
