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

	interface Props {
		tag: string
		size?: number
		noTooltip?: boolean
	}
	const { tag, noTooltip, size = 48 }: Props = $props()

	let icon = $derived((icons[`../assets/tagIcons/${tag}.svg`] as { default: string })?.default)
</script>

{#snippet iconPart(triggerProps: Record<string, unknown>)}
	{@const customIcon = customIcons[tag]}
	{#if customIcon}
		<CustomTagIconContent {triggerProps} {size} src={customIcon} />
	{:else}
		<TagIconContent
			{triggerProps}
			danger={dangerIcons.includes(tag)}
			warning={warningIcons.includes(tag)}
			{size}
			src={icon}
		/>
	{/if}
{/snippet}

{#if noTooltip}
	{@render iconPart({})}
{:else}
	<Tooltip>
		{#snippet trigger({ props })}
			{@render iconPart(props)}
		{/snippet}

		<TooltipTitle>
			<Translation key="tags:{tag}" />
		</TooltipTitle>

		<TooltipDescription>
			<Translation key="tags:{tag}-description" />
		</TooltipDescription>
	</Tooltip>
{/if}
