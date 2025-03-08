<script lang="ts">
	import { type TableOfContentsItem, type TableOfContentsElements, melt } from '@melt-ui/svelte'

	export let tree: TableOfContentsItem[] = []
	export let activeHeadingIdxs: number[]
	export let item: TableOfContentsElements['item']
	export let level = 1
</script>

<ul class="list" class:sub={level !== 1}>
	{#if tree && tree.length}
		{#each tree as heading, i (i)}
			<li>
				<a href="#{heading.id}" use:melt={$item(heading.id)} class="item">
					<!--
            Along with the heading title, the original heading node
            is also passed down, so you can display headings
            however you want.
          -->
					{@html heading.node.innerHTML}
				</a>
				{#if heading.children && heading.children.length}
					<svelte:self tree={heading.children} level={level + 1} {activeHeadingIdxs} {item} />
				{/if}
			</li>
		{/each}
	{/if}
</ul>

<style lang="scss">
	@use '@adofai-gg/ui/dist/stylesheets/system/colors' as *;

	.sub {
		padding-left: 8px;
	}

	.item {
		display: flex;
		color: rgba(255, 255, 255, 0.4);
		transition: color ease 0.2s;

		&:hover {
			color: white;
		}

		&:global([data-active]) {
			color: $blue;
		}
	}
</style>
