<script lang="ts">
	import clsx from 'clsx'
	import { type AnyMeltElement, melt } from '@melt-ui/svelte'

	interface Props {
		danger: boolean
		warning: boolean
		src: string
		size: number
		meltElement: AnyMeltElement
	}

	const { src, danger, warning, size, meltElement }: Props = $props()
</script>

<div
	use:melt={$meltElement}
	class={clsx('tag-icon', {
		danger,
		warning
	})}
	style="--size: {size}px; --image: url('{src}');"
></div>

<style lang="scss">
	@import '@adofai-gg/ui/dist/stylesheets/system/colors';

	.tag-icon {
		width: var(--size);
		height: var(--size);
		background-color: white;
		mask-size: var(--size);
		mask-image: var(--image);

		&.danger {
			background-color: $red;
		}

		&.warning {
			background-color: $yellow;
		}
	}
</style>
