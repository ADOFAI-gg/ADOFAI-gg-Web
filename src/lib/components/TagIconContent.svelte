<script lang="ts">
	import clsx from 'clsx'

	interface Props {
		danger: boolean
		warning: boolean
		src: string
		size: number
		triggerProps: Record<string, unknown>
	}

	const { src, danger, warning, size, triggerProps }: Props = $props()

	let srcContent = $derived(src.replaceAll("'", "\\'"))
</script>

<div
	{...triggerProps}
	class={clsx('tag-icon', {
		danger,
		warning
	})}
	style="--size: {size}px; --image: url('{srcContent}');"
></div>

<style lang="scss">
	@use '@adofai-gg/ui/dist/stylesheets/system/colors';

	.tag-icon {
		width: var(--size);
		height: var(--size);
		background-color: white;
		mask-size: var(--size);
		mask-image: var(--image);

		&.danger {
			background-color: colors.$red;
		}

		&.warning {
			background-color: colors.$yellow;
		}
	}
</style>
