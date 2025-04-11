<script lang="ts" module>
	const icons = import.meta.glob('../assets/difficultyIcons/*.svg', { eager: true })
</script>

<script lang="ts">
	import { Avatar } from '@adofai-gg/ui'

	interface Props {
		difficulty: number | null
		size?: number
	}
	const { difficulty, size = 48 }: Props = $props()

	let difficultyName = $derived.by(() => {
		if (difficulty === null) return 'unknown'
		if (difficulty === 0.1) return 'legacy_tiny'
		if (difficulty === 101) return 'legacy_minus1'
		return difficulty.toFixed(1)
	})

	let icon = $derived(
		(icons[`../assets/difficultyIcons/${difficultyName}.svg`] as { default: string })?.default ??
			(icons['../assets/difficultyIcons/unknown.svg'] as { default: string }).default
	)
</script>

<Avatar {size} src={icon} />
