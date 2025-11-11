<script lang="ts">
	import { tagIconName } from '$lib/utils/level';
	import { cn, Tooltip } from '@adofai-gg/ui';
	import Icon from '@iconify/svelte';
	import { Localized } from '@nubolab-ffwd/svelte-fluent';

	type Props = { tag: string; class?: string };

	const { class: className, tag, ...restProps }: Props = $props();
</script>

<Localized id="tag-{tag}">
	{#snippet children({ text, attrs })}
		<Tooltip contentProps={{ side: 'bottom' }} disableHoverableContent>
			{#snippet trigger({ props })}
				<div {...props}>
					<Icon icon={tagIconName(tag)} class={cn(className)} {...restProps} />
				</div>
			{/snippet}

			{#snippet title()}
				{text}
			{/snippet}

			{attrs.description}
		</Tooltip>
	{/snippet}
</Localized>
