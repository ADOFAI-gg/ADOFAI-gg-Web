<script lang="ts">
	import { Container, SearchBar, Logo, Translation, getGlobalContext } from '@adofai-gg/ui'
	import MainSection from '$lib/components/main/MainSection.svelte'
	import { goto } from '$app/navigation'
	import type { PageData } from './$types'
	import LevelListItem from '~/lib/components/levelList/LevelListItem.svelte'
	import MainLink from '~/lib/components/main/MainLink.svelte'
	import { localizeNotice, formatNoticeDate, noticeCategoryKey } from '~/lib/utils/notice'

	interface Props {
		data: PageData
	}

	const { data }: Props = $props()
	const { language } = getGlobalContext()

	let searchQuery = $state('')

	const banner = $derived(data.banner)

	const onSearch = async (ev: Event) => {
		ev.preventDefault()

		if (!searchQuery) return

		await goto(`/levels?q=${encodeURIComponent(searchQuery)}`)
	}
</script>

<main class="root">
	<Container>
		<div class="top">
			<Logo height={67} />

			<div class="search-area">
				<form onsubmit={onSearch}>
					<SearchBar bind:value={searchQuery} placeholder="level:search-placeholder" />
				</form>
			</div>

			<div class="links-area">
				<MainLink href="/docs/censorship-guidelines">
					<Translation key="main:link-quality-guideline" />
				</MainLink>
			</div>
		</div>

		<div class="main-columns">
			<div class="column">
				<MainSection title="main:notices" link="/notices">
					<div class="notice-section-body">
						{#if banner && banner.imageUrl}
							{#if banner.linkUrl}
								<a
									href={banner.linkUrl}
									class="featured-notice-card"
									target={banner.linkUrl.startsWith('http') ? '_blank' : undefined}
									rel={banner.linkUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
								>
									<img class="featured-notice-bg" src={banner.imageUrl} alt="Banner" />
								</a>
							{:else}
								<div class="featured-notice-card">
									<img class="featured-notice-bg" src={banner.imageUrl} alt="Banner" />
								</div>
							{/if}
						{/if}

						{#if data.notices.results.length > 0}
							<div class="notice-list">
								{#each data.notices.results.map((notice) => localizeNotice(notice, $language)) as notice (notice.id)}
									<a href="/notices/{notice.id}" class="notice-row">
										{#if notice.featured}
											<span class="notice-chip notice-chip-pinned">
												<Translation key="main:notice-pinned" />
											</span>
										{/if}
										<span class="notice-chip">
											<Translation key={noticeCategoryKey(notice.category)} />
										</span>
										<span class="notice-title">{notice.title}</span>
										<span class="notice-date">
											{formatNoticeDate(notice.publishedAt ?? notice.createdAt, $language)}
										</span>
									</a>
								{/each}
							</div>
						{:else}
							<div class="notice-empty">
								<Translation key="main:notice-empty" />
							</div>
						{/if}
					</div>
				</MainSection>
			</div>

			<div class="column">
				<MainSection
					title="main:recent-legendary-levels"
					link={`/levels?q=&f=[{"key"%3A"quality"%2C"value"%3A["LEGENDARY"]}]`}
				>
					{#each data.featured.results as level}
						<LevelListItem {level} />
					{/each}
				</MainSection>
			</div>
		</div>
	</Container>
</main>

<style lang="scss">
	@use '@adofai-gg/ui/dist/stylesheets/system/breakpoints' as *;

	.root {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: calc(100vh - 56px - 64px);
		padding-top: 128px;
		padding-bottom: 64px;
	}

	.search-area {
		width: 100%;
		max-width: 760px;
		margin-top: 38px;
	}

	.top {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 84px;
	}

	.links-area {
		display: flex;
		gap: 18px;
		margin-top: 12px;
	}

	.main-columns {
		display: grid;
		grid-template-columns: 1fr;
		gap: 24px;
		align-items: start;

		@include breakpoint('lg') {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		}
	}

	.column {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.notice-section-body {
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin-top: 6px;
	}

	.featured-notice-card {
		position: relative;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		width: 100%;
		height: 180px;
		padding: 28px;
		overflow: hidden;
		border-radius: 8px;
		background-color: #0c0d13;
		text-decoration: none;
		transition: transform 0.2s ease;

		&:hover {
			.featured-notice-bg {
				transform: scale(1.03);
			}
		}
	}

	.featured-notice-bg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.notice-list {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.notice-row {
		display: flex;
		gap: 8px;
		align-items: center;
		width: 100%;
		padding: 10px 0;
		overflow: hidden;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		text-decoration: none;
		transition: background-color 0.15s ease;

		&:hover {
			.notice-title {
				text-decoration: underline;
			}
		}
	}

	.notice-chip {
		display: inline-flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		padding: 4px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 4px;
		color: rgba(255, 255, 255, 0.6);
		font-size: 14px;
		line-height: 1;
		letter-spacing: -0.154px;
	}

	.notice-chip-pinned {
		border-color: #3b84f1;
		color: #3b84f1;
		font-weight: 700;
	}

	.notice-title {
		flex: 1 1 0;
		min-width: 0;
		overflow: hidden;
		color: #fff;
		font-size: 15px;
		line-height: 1.4;
		letter-spacing: -0.165px;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.notice-date {
		flex-shrink: 0;
		color: rgba(255, 255, 255, 0.4);
		font-size: 12px;
		line-height: 1.4;
		letter-spacing: -0.132px;
		text-align: right;
		white-space: nowrap;
	}

	.notice-empty {
		padding: 32px 0;
		color: rgba(255, 255, 255, 0.4);
		font-size: 14px;
		text-align: center;
	}
</style>
