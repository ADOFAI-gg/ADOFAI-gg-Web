<script lang="ts" module>
	const icons = import.meta.glob('../assets/difficultyIcons/*.svg', { eager: true })
</script>

<script lang="ts">
	interface Props {
		difficulty: number | null
		size?: number
	}
	const { difficulty, size = 48 }: Props = $props()

	let difficultyName = $derived.by(() => {
		if (difficulty === null) return 'unknown'
		if (difficulty === 0.1) return 'tiny'
		if (difficulty === 18.5) return '18+'
		if (difficulty === 19.5) return '19+'
		if (difficulty === 20) return '20.1'
		if (difficulty === 21) return '21.0'
		if (difficulty === 22) return '22.0'
		if (difficulty === 101) return '-1'
		return difficulty.toString()
	})

	let icon = $derived(
		(icons[`../assets/difficultyIcons/${difficultyName}.svg`] as { default: string })?.default ??
			(icons['../assets/difficultyIcons/unknown.svg'] as { default: string }).default
	)
</script>

<img width={size} height={size} src={icon} alt="difficulty icon" />
