<script lang="ts">
	import { Container, Logo } from '@adofai-gg/ui'
	import MainSection from '$lib/components/main/MainSection.svelte'
</script>

<main class="root">
	<Container>
		<div class="top">
			<Logo height={67} />

			대충검색바
		</div>

		<MainSection title="main:recent-featured-levels">wow</MainSection>
	</Container>
</main>

<style lang="scss">
	.root {
		margin-top: 138px;
	}

	.top {
		margin-bottom: 84px;
	}
</style>
