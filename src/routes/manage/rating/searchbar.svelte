<script lang="ts">
	import {
		getGlobalContext,
		SearchBar,
		SearchOptionsBar,
		type SearchOptionScheme,
		type SearchOptionsData
	} from '@adofai-gg/ui'
	import { buildLevelSearchScheme } from '~/routes/levels/search'

	const { language } = getGlobalContext()

	const scheme: SearchOptionScheme = $derived(buildLevelSearchScheme($language))

	let searchOptionsState = $state<SearchOptionsData>({
		filter: [],
		sort: 'id:desc'
	})
</script>

<SearchBar placeholder="manage:rating-search-placeholder" />

<div class="options-bar">
	<SearchOptionsBar {scheme} bind:data={searchOptionsState} />
</div>

<style lang="scss">
	.options-bar {
		margin-top: 8px;
	}
</style>
