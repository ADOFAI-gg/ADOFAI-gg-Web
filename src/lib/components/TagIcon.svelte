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
	}
	const { tag, size = 48 }: Props = $props()

	let icon = $derived((icons[`../assets/tagIcons/${tag}.svg`] as { default: string })?.default)
</script>

<Tooltip>
	{#snippet trigger({ trigger })}
		{@const customIcon = customIcons[tag]}
		{#if customIcon}
			<CustomTagIconContent meltElement={trigger} {size} src={customIcon} />
		{:else}
			<TagIconContent
				meltElement={trigger}
				danger={dangerIcons.includes(tag)}
				warning={warningIcons.includes(tag)}
				{size}
				src={icon}
			/>
		{/if}
	{/snippet}

	<TooltipTitle>
		<Translation key="tags:{tag}" />
	</TooltipTitle>

	<TooltipDescription>
		<Translation key="tags:{tag}-description" />
	</TooltipDescription>
</Tooltip>
