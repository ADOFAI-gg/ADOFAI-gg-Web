<script lang="ts">
	import { Container, SearchBar, Logo, Translation } from '@adofai-gg/ui'
	import MainSection from '$lib/components/main/MainSection.svelte'
	import { goto } from '$app/navigation'
	import type { PageData } from './$types'
	import LevelListItem from '~/lib/components/levelList/LevelListItem.svelte'
	import MainLink from '~/lib/components/main/MainLink.svelte'

	interface Props {
		data: PageData
	}

	const { data }: Props = $props()

	let searchQuery = $state('')

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
				<MainLink href="/">
					<Translation key="main:link-usage" />
				</MainLink>
				<MainLink href="/">
					<Translation key="main:link-quality-guideline" />
				</MainLink>
			</div>
		</div>

		<MainSection
			title="main:recent-legendary-levels"
			link={`/levels?q=&f=[{"key"%3A"quality"%2C"value"%3A["LEGENDARY"]}]`}
		>
			{#each data.featured.results as level}
				<LevelListItem {level} />
			{/each}
		</MainSection>
	</Container>
</main>

<style lang="scss">
	@use '@adofai-gg/ui/dist/stylesheets/system/breakpoints';

	.root {
		min-height: calc(100vh - 56px - 64px);
		padding-top: 128px;
		padding-bottom: 64px;
		display: flex;
		flex-direction: column;
		justify-content: center;
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
		margin-top: 12px;
		gap: 18px;
		display: flex;
	}
</style>
