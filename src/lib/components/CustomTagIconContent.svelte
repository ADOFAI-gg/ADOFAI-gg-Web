<script lang="ts">
	import { Avatar } from '@adofai-gg/ui'
	import { type AnyMeltElement, melt } from '@melt-ui/svelte'

	interface Props {
		src: string
		size: number
		meltElement: AnyMeltElement
	}

	const { src, size, meltElement }: Props = $props()
</script>

<div use:melt={$meltElement}>
	<Avatar {size} {src} />
</div>

<style lang="scss">
	@use '@adofai-gg/ui/dist/stylesheets/system/colors';

	.custom-tag-icon {
		width: var(--size);
		height: var(--size);
		background-image: var(--image);
	}
</style>
