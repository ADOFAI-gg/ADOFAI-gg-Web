<script>
	import LevelInfo from './level-info.svelte'
	import RatingItem from './rating-item.svelte'
	import Searchbar from './searchbar.svelte'
</script>

<div class="level-list">
	<Searchbar />
	<div class="level-list-content">
		<RatingItem />
	</div>
</div>

<LevelInfo />

<style lang="scss">
	.level-list {
		width: 400px;

		&-content {
			margin-top: 16px;
		}
	}
</style>
