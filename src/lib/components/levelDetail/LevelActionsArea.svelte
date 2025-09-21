<script lang="ts">
	import { Button, getGlobalContext, Modal, toast, translateKey, Translation } from '@adofai-gg/ui'
	import type { APILevel } from '~/lib/types'
	import { getDownloadUrl } from '~/lib/utils/level'
	import ReRateDialog from './ReRateDialog.svelte'

	interface Props {
		level: APILevel
	}

	const { level }: Props = $props()

	const downloadUrl = $derived(getDownloadUrl(level))

	const { language } = getGlobalContext()

	const shareLevel = async () => {
		const href = new URL(`/levels/${level.id}`, document.baseURI).toString()
		if (typeof navigator.share === 'function') {
			await navigator.share({
				title: `${level.music.artists.map((x) => x.displayName).join(' & ')} - ${level.title}`,
				url: href
			})
		} else {
			await navigator.clipboard.writeText(href)
			toast.success(translateKey($language, 'level:link-copied', {}))
		}
	}
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
	<!-- <Button size="lg" leftIcon="heartOutlined" variant="ghost-dark">TODO</Button> -->
	<Button size="lg" variant="ghost-dark" onclick={() => shareLevel()}>
		<Translation key="level:share" />
	</Button>

	<Modal options={{ closeOnOutsideClick: false }}>
		{#snippet trigger({ trigger })}
			<Button size="lg" variant="ghost-dark" slot="trigger" meltElement={trigger}>
				<Translation key="level:request-re-rate" />
			</Button>
		{/snippet}

		{#snippet children({ close })}
			<ReRateDialog {close} {level} />
		{/snippet}
	</Modal>
</div>

<style lang="scss">
	.level-actions-area {
		display: flex;
		gap: 8px;
	}
</style>
