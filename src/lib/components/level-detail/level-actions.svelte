<script lang="ts">
	import type { APILevel } from '$lib/types/api';
	import { getDownloadUrl, isWorkshopLink } from '$lib/utils/level';
	import { Button, cn, encode, LinkButton, toast } from '@adofai-gg/ui';
	import Icon from '@iconify/svelte';
	import { getFluentContext, Localized } from '@nubolab-ffwd/svelte-fluent';
	import type { HTMLAttributes } from 'svelte/elements';

	const {
		level,
		class: className,
		...restProps
	}: {
		level: APILevel;
	} & HTMLAttributes<HTMLDivElement> = $props();

	const downloadUrl = $derived(getDownloadUrl(level));
	const workshopUrl = $derived(level.workshopUrl?.trim());
	const hasWorkshop = $derived(workshopUrl ? isWorkshopLink(workshopUrl) : false);

	const fluent = getFluentContext();
</script>

<div class={cn('flex gap-2', className)} {...restProps}>
	{#if downloadUrl}
		<LinkButton href={downloadUrl} target="_blank" rel="noreferrer">
			<Icon icon="gg:arrow-down-with-file" class="size-6" />
			<Localized id="level-download" />
		</LinkButton>
	{/if}

	{#if hasWorkshop}
		<LinkButton href={workshopUrl} target="_blank" rel="noreferrer" variant="ghostDark">
			<Icon icon="gg:steam" class="size-6" />
			<Localized id="level-workshop" />
		</LinkButton>
	{/if}

	<Button
		variant="ghostDark"
		onclick={() => {
			const share: ShareData = {};
			if (navigator.canShare && navigator.canShare(share)) {
				navigator.share(share);
				return;
			}
			navigator.clipboard.writeText(
				new URL(encode`/levels/${level.id}`, window.location.href).toString()
			);
			toast.success(fluent.localize('level-link-copied'));
		}}
	>
		<Localized id="level-share" />
	</Button>
</div>
