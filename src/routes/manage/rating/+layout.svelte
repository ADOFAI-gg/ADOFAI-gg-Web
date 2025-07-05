<script lang="ts">
	import RatingItem from './rating-item.svelte'
	import Searchbar from './searchbar.svelte'
	import type { Snippet } from 'svelte'

	interface Props {
		children?: Snippet
	}

	const { children }: Props = $props()
</script>

<div class="level-list">
	<Searchbar />
	<div class="level-list-content">
		<RatingItem />
	</div>
</div>

{@render children?.()}

<style lang="scss">
	.level-list {
		width: 400px;

		&-content {
			margin-top: 16px;
		}
	}
</style>
