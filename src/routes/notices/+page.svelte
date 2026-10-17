<script lang="ts">
	import { Button, Container, Translation, getGlobalContext } from '@adofai-gg/ui'
	import type { PageData } from './$types'
	import {
		NOTICE_CATEGORIES,
		localizeNotice,
		formatNoticeDate,
		noticeCategoryKey
	} from '~/lib/utils/notice'
	import { isForumAdmin } from '~/lib/utils/perm'
	import { page } from '$app/state'

	interface Props {
		data: PageData
	}

	const { data }: Props = $props()
	const { language } = getGlobalContext()

	const isAdmin = $derived(isForumAdmin(page.data.currentUser))
</script>

<Container>
	<div class="notices-page">
		<div class="header-row">
			<h1 class="page-title">
				<Translation key="main:notices" />
			</h1>
		</div>

		<div class="category-tabs">
			<a href="/notices" class="category-tab" class:active={!data.selectedCategory}>
				{$language === 'ko' ? '전체' : 'All'}
			</a>
			{#each NOTICE_CATEGORIES as category (category)}
				<a
					href="/notices?category={category}"
					class="category-tab"
					class:active={data.selectedCategory === category}
				>
					<Translation key={noticeCategoryKey(category)} />
				</a>
			{/each}
		</div>

		{#if data.notices.results.length > 0}
			<div class="notice-list">
				{#each data.notices.results.map( (notice) => localizeNotice(notice, $language) ) as notice (notice.id)}
					<a href="/notices/{notice.id}" class="notice-item">
						<div class="notice-item-top">
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
							<span class="notice-title">{notice.title}</span>
							<span class="notice-date">
								{formatNoticeDate(notice.publishedAt ?? notice.createdAt, $language)}
							</span>
						</div>
						{#if notice.subtitle || notice.excerpt}
							<p class="notice-excerpt">{notice.subtitle ?? notice.excerpt}</p>
						{/if}
					</a>
				{/each}
			</div>
		{:else}
			<div class="notice-empty">
				<Translation key="main:notice-empty" />
			</div>
		{/if}
	</div>
</Container>

<style lang="scss">
	.notices-page {
		display: flex;
		flex-direction: column;
		gap: 20px;
		margin-top: 36px;
	}

	.header-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 12px;
		border-bottom: 2px solid rgba(255, 255, 255, 0.2);
	}

	.page-title {
		font-weight: 600;
		font-size: 32px;
		line-height: 1.3;
	}

	.category-tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.category-tab {
		padding: 6px 12px;
		border: 1px solid rgba(255, 255, 255, 0.16);
		border-radius: 6px;
		color: rgba(255, 255, 255, 0.65);
		font-size: 14px;
		text-decoration: none;
		transition:
			background-color 0.15s ease,
			border-color 0.15s ease,
			color 0.15s ease;

		&:hover,
		&.active {
			border-color: #3b84f1;
			background-color: rgba(59, 132, 241, 0.16);
			color: #fff;
		}
	}

	.notice-list {
		display: flex;
		flex-direction: column;
	}

	.notice-item {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 14px 4px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		text-decoration: none;

		&:hover {
			.notice-title {
				text-decoration: underline;
			}
		}
	}

	.notice-item-top {
		display: flex;
		gap: 8px;
		align-items: center;
		min-width: 0;
	}

	.notice-chip {
		display: inline-flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		padding: 4px 6px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 4px;
		color: rgba(255, 255, 255, 0.6);
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

	.notice-title {
		flex: 1 1 0;
		min-width: 0;
		overflow: hidden;
		color: #fff;
		font-weight: 500;
		font-size: 16px;
		line-height: 1.4;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.notice-date {
		flex-shrink: 0;
		color: rgba(255, 255, 255, 0.4);
		font-size: 13px;
		white-space: nowrap;
	}

	.notice-excerpt {
		margin: 0;
		overflow: hidden;
		color: rgba(255, 255, 255, 0.55);
		font-size: 14px;
		line-height: 1.4;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.notice-empty {
		padding: 48px 0;
		color: rgba(255, 255, 255, 0.45);
		text-align: center;
	}
</style>
