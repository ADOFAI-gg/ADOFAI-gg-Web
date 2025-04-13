<script lang="ts">
	import { Container, Translation } from '@adofai-gg/ui'
	import type { PageData } from './$types'
	import { createTableOfContents } from '@melt-ui/svelte'
	import ToCTree from './ToCTree.svelte'

	interface Props {
		data: PageData
	}

	const { data }: Props = $props()

	const {
		elements: { item },
		states: { activeHeadingIdxs, headingsTree }
	} = createTableOfContents({
		selector: '#docs-body',
		scrollOffset: 96,
		activeType: 'highest'
	})

	$effect(() => {
		console.log($activeHeadingIdxs)
	})
</script>

<Container>
	<div class="layout">
		<div class="content">
			<h1 class="title">{data.metadata.title}</h1>
			<h2 class="subtitle">{data.metadata.subtitle}</h2>

			<div class="markdown-body" id="docs-body">
				<data.content />
			</div>
		</div>

		<div class="toc">
			<h4>
				<Translation key="common:table-of-contents" />
			</h4>

			{#key $headingsTree}
				<ToCTree tree={$headingsTree} activeHeadingIdxs={$activeHeadingIdxs} {item} />
			{/key}
		</div>
	</div>
</Container>

<style lang="scss">
	@use '@adofai-gg/ui/dist/stylesheets/system/breakpoints' as *;

	.layout {
		@include breakpoint('md') {
			display: grid;
			grid-template-columns: 8fr 4fr;
		}

		@include breakpoint('lg') {
			grid-template-columns: 9fr 3fr;
		}

		display: flex;
		flex-direction: column-reverse;
		gap: 24px;
		margin-top: 32px;
	}

	.markdown-body {
		flex-grow: 1;
		margin-top: 16px;
	}

	.toc {
		@include breakpoint('md') {
			position: sticky;
			top: 96px;
		}

		height: fit-content;
		padding: 16px;
		border-radius: 8px;
		background-color: rgba(0, 0, 0, 0.1);

		h4 {
			margin-bottom: 8px;
			font-weight: 800;
			font-size: 14px;
		}
	}

	.title {
		font-weight: 600;
		font-size: 48px;
		line-height: 1.2;
	}

	.subtitle {
		margin-top: 8px;
		font-weight: 500;
		font-size: 28px;
		line-height: 1.2;
	}
</style>
