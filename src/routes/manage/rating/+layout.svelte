<script lang="ts">
	import LevelList from './layout/rating-list.svelte'
	import type { Snippet } from 'svelte'

	interface Props {
		children?: Snippet
	}

	const { children }: Props = $props()
</script>

<LevelList />

{@render children?.()}
