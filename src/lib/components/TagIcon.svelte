<script lang="ts" module>
	const icons = import.meta.glob('../assets/tagIcons/*.svg', { eager: true })

	const dangerIcons = ['EPILEPSY_WARNING', 'NSFW']
	const warningIcons = ['DLC']
</script>

<script lang="ts">
	import { Tooltip, TooltipTitle, Translation, TooltipDescription } from '@adofai-gg/ui'

	import TagIconContent from './TagIconContent.svelte'

	interface Props {
		tag: string
		size?: number
	}
	const { tag, size = 48 }: Props = $props()

	let icon = $derived((icons[`../assets/tagIcons/${tag}.svg`] as { default: string })?.default)
</script>

<Tooltip>
	{#snippet trigger({ trigger })}
		<TagIconContent
			meltElement={trigger}
			danger={dangerIcons.includes(tag)}
			warning={warningIcons.includes(tag)}
			{size}
			src={icon}
		/>
	{/snippet}

	<TooltipTitle>
		<Translation key="tags:{tag}" />
	</TooltipTitle>

	<TooltipDescription>
		<Translation key="tags:{tag}-description" />
	</TooltipDescription>
</Tooltip>
