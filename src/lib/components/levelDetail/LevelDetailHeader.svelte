<script lang="ts">
	import { Container, Tag } from '@adofai-gg/ui'
	import type { APILevel } from '~/lib/types'
	import { getLevelThumbnail } from '~/lib/utils/parser'

	interface Props {
		level: APILevel
	}

	const { level }: Props = $props()

	let thumbnailUrl = $derived(getLevelThumbnail(level))
</script>

<div
	class="level-detail-header"
	style={thumbnailUrl ? `--background-image: url('${thumbnailUrl}')` : ''}
></div>

<style lang="scss">
	.level-detail-header {
		height: 256px;
		background: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
			var(--background-image);
		background-position: center;
		background-size: cover;
	}
</style>
