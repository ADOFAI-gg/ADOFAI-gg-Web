<script lang="ts">
	import { Button, Translation } from '@adofai-gg/ui'
	import type { APILevel } from '~/lib/types'
	import { getDownloadUrl } from '~/lib/utils/level'

	interface Props {
		level: APILevel
	}

	const { level }: Props = $props()

	const downloadUrl = $derived(getDownloadUrl(level))
</script>

<div class="level-actions-area">
	{#if downloadUrl}
		<a href={downloadUrl} rel="noreferrer" target="_blank">
			<Button size="lg" leftIcon="fileDownload">
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
	<Button size="lg" leftIcon="heartOutlined" variant="ghost-dark">TODO</Button>
	<Button size="lg" variant="ghost-dark">
		<Translation key="level:share" />
	</Button>
	<Button size="lg" variant="ghost-dark">
		<Translation key="level:report" />
	</Button>
</div>

<style lang="scss">
	.level-actions-area {
		display: flex;
		gap: 8px;
	}
</style>
