<script lang="ts" module>
	import LEGENDARY from '../assets/customTagIcons/LEGENDARY.svg'
	import FEATURED from '../assets/customTagIcons/FEATURED.svg'

	const icons = import.meta.glob('../assets/tagIcons/*.svg', { eager: true })

	const dangerIcons = ['EPILEPSY_WARNING', 'NSFW']
	const warningIcons = ['DLC']
	const customIcons: Record<string, string> = {
		LEGENDARY,
		FEATURED
	}
</script>

<script lang="ts">
	import { Tooltip, TooltipTitle, Translation, TooltipDescription } from '@adofai-gg/ui'

	import TagIconContent from './TagIconContent.svelte'
	import CustomTagIconContent from './CustomTagIconContent.svelte'
	import { emptyMeltElement, type AnyMeltElement } from '@melt-ui/svelte'

	interface Props {
		tag: string
		size?: number
		noTooltip?: boolean
	}
	const { tag, noTooltip, size = 48 }: Props = $props()

	let icon = $derived((icons[`../assets/tagIcons/${tag}.svg`] as { default: string })?.default)
</script>

{#snippet iconPart(meltElement: AnyMeltElement)}
	{@const customIcon = customIcons[tag]}
	{#if customIcon}
		<CustomTagIconContent {meltElement} {size} src={customIcon} />
	{:else}
		<TagIconContent
			{meltElement}
			danger={dangerIcons.includes(tag)}
			warning={warningIcons.includes(tag)}
			{size}
			src={icon}
		/>
	{/if}
{/snippet}

{#if noTooltip}
	{@render iconPart(
		/* @ts-expect-error what */
		emptyMeltElement
	)}
{:else}
	<Tooltip>
		{#snippet trigger({ trigger })}
			{@render iconPart(trigger)}
		{/snippet}

		<TooltipTitle>
			<Translation key="tags:{tag}" />
		</TooltipTitle>

		<TooltipDescription>
			<Translation key="tags:{tag}-description" />
		</TooltipDescription>
	</Tooltip>
{/if}
