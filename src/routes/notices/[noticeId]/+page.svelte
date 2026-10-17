<script lang="ts">
	import { Button, Container, Translation, getGlobalContext } from '@adofai-gg/ui'
	import type { PageData } from './$types'
	import { createTableOfContents } from '@melt-ui/svelte'
	import ToCTree from '../../docs/[...slug]/ToCTree.svelte'
	import { localizeNotice, formatNoticeDate, noticeCategoryKey } from '~/lib/utils/notice'
	import { isForumAdmin } from '~/lib/utils/perm'
	import { page } from '$app/state'

	interface Props {
		data: PageData
	}

	const { data }: Props = $props()
	const { language } = getGlobalContext()

	const notice = $derived(localizeNotice(data.notice, $language))
	const isAdmin = $derived(isForumAdmin(page.data.currentUser))

	const {
		elements: { item },
		states: { activeHeadingIdxs, headingsTree }
	} = createTableOfContents({
		selector: '#docs-body',
		scrollOffset: 96,
		activeType: 'highest'
	})
</script>

<Container>
	<div class="layout">
		<div class="toc">
			<h4>
				<Translation key="common:table-of-contents" />
			</h4>

			{#key $headingsTree}
				<ToCTree tree={$headingsTree} activeHeadingIdxs={$activeHeadingIdxs} {item} />
			{/key}
		</div>

		<div class="content">
			<div class="meta-bar">
				<a href="/notices" class="back-link">
					← <Translation key="main:notices" />
				</a>
			</div>

			<div class="meta-chips">
				{#if notice.featured}
					<span class="notice-chip notice-chip-pinned">
						<Translation key="main:notice-pinned" />
					</span>
				{/if}
				{#if !notice.published}
					<span class="notice-chip notice-chip-draft">
						<Translation key="manage:notice-draft" />
					</span>
				{/if}
				<span class="notice-chip">
					<Translation key={noticeCategoryKey(notice.category)} />
				</span>
			</div>
			<br />

			<h1 class="title">{notice.title}</h1>
			<div class="meta-container">
				<span class="meta-date">
					{formatNoticeDate(notice.publishedAt ?? notice.createdAt, $language, true)}
				</span>
				<span class="meta-divider">•</span>
				{#if notice.author}
					<a href="/members/{notice.author.id}" class="meta-author">
						{notice.author.name}
					</a>
				{/if}
			</div>

			{#if notice.subtitle}
				<h2 class="subtitle">{notice.subtitle}</h2>
			{/if}

			{#key `${notice.id}-${$language}`}
				<div class="markdown-body" id="docs-body">
					{@html notice.body ?? ''}
				</div>
			{/key}
		</div>
	</div>
</Container>

<style lang="scss">
	@use '@adofai-gg/ui/dist/stylesheets/system/breakpoints' as *;

	.meta-container {
		display: flex;
		margin-top: 8px;
		gap: 8px;
	}

	.layout {
		@include breakpoint('md') {
			display: grid;
			grid-template-columns: 8fr 4fr;
		}

		@include breakpoint('lg') {
			grid-template-columns: 9fr 3fr;
		}

		display: grid;
		gap: 24px;
		margin-top: 32px;
	}

	.content {
		min-width: 0;
	}

	.meta-bar {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		align-items: center;
		margin-bottom: 16px;
	}

	.meta-divider {
		color: rgba(255, 255, 255, 0.5);
		font-size: 14px;
	}

	.back-link {
		color: rgba(255, 255, 255, 0.65);
		font-size: 14px;
		text-decoration: none;

		&:hover {
			color: #fff;
		}
	}

	.meta-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		align-items: center;
	}

	.admin-actions {
		margin-left: auto;
	}

	.notice-chip {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 4px 6px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 4px;
		color: rgba(255, 255, 255, 0.65);
		font-size: 13px;
		line-height: 1;
	}

	.notice-chip-pinned {
		border-color: #3b84f1;
		color: #3b84f1;
		font-weight: 700;
	}

	.notice-chip-draft {
		border-color: #ecce23;
		color: #ecce23;
		font-weight: 600;
	}

	.meta-date {
		color: rgba(255, 255, 255, 0.5);
		font-size: 14px;
	}

	.meta-author {
		color: rgba(255, 255, 255, 0.75);
		font-weight: 500;
		font-size: 14px;
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}

	.banner-wrapper {
		margin-top: 20px;
		overflow: hidden;
		border-radius: 8px;
	}

	.banner-image {
		display: block;
		width: 100%;
		max-height: 360px;
		object-fit: cover;
	}

	.markdown-body {
		flex-grow: 1;
		margin-top: 24px;
	}

	.toc {
		@include breakpoint('md') {
			position: sticky;
			top: 96px;
			order: 1;
		}

		height: fit-content;
		padding: 16px;
		border-radius: 8px;
		background-color: rgb(0, 0, 0, 0.1);

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
		color: rgba(255, 255, 255, 0.75);
		font-weight: 500;
		font-size: 28px;
		line-height: 1.2;
	}
</style>
