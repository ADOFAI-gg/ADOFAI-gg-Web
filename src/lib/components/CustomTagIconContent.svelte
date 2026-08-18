<script lang="ts">
	import { Avatar } from '@adofai-gg/ui'

	interface Props {
		src: string
		size: number
		triggerProps: Record<string, unknown>
	}

	const { src, size, triggerProps }: Props = $props()
</script>

<div {...triggerProps}>
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
