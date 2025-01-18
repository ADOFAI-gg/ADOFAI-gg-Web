<script lang="ts">
	import { Container, SearchBar, Logo } from '@adofai-gg/ui'
	import MainSection from '$lib/components/main/MainSection.svelte'
	import { goto } from '$app/navigation'
	import type { PageData } from './$types'
	import LevelListItem from '~/lib/components/levelList/LevelListItem.svelte'

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
		</div>

		<MainSection title="main:recent-featured-levels">
			{#each data.featured.results as level}
				<LevelListItem {level} />
			{/each}
		</MainSection>
	</Container>
</main>

<style lang="scss">
	@use '@adofai-gg/ui/dist/stylesheets/system/breakpoints';

	.root {
		@include breakpoints.breakpoint('md') {
			margin-top: 138px;
		}

		margin-top: 64px;
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
</style>
