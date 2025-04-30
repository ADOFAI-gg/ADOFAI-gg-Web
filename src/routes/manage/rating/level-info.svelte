<script lang="ts">
	import InfoMainSection from './info-main-section.svelte'
</script>

<!-- <div class="no-levels">
	<Translation key="manage:no-levels" />
</div> -->

<InfoMainSection />

<div class="details-section">asdf</div>

<style lang="scss">
	@use '@adofai-gg/ui/dist/stylesheets/system/colors' as *;

	.no-levels {
		text-align: center;
		width: 0;
		flex-grow: 1;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		opacity: 0.4;
		user-select: none;
	}

	.details-section {
		width: 400px;
	}
</style>
