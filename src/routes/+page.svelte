<script lang="ts">
	import { Container, SearchBar, Logo, type SearchOptionsData } from '@adofai-gg/ui'
	import MainSection from '$lib/components/main/MainSection.svelte'
	import { goto } from '$app/navigation'

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

		<MainSection title="main:recent-featured-levels">wow</MainSection>
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
