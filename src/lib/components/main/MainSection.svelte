<script lang="ts">
	import type { Snippet } from 'svelte'
	import { type TranslationKey, Translation, Icon } from '@adofai-gg/ui'

	interface Props {
		title: TranslationKey
		children: Snippet
	}

	const { children, title }: Props = $props()
</script>

<section class="section">
	<div class="title-area">
		<div class="title">
			<Translation key={title} />
		</div>

		<div class="spacer"></div>

		<a href="/" class="more-link">
			<Translation key="common:show-more" />

			<Icon icon="chevronRight" size={18} alt="icon" />
		</a>
	</div>
</section>

{@render children()}

<style lang="scss">
	.title {
		font-size: 24px;
		font-weight: 600;
		line-height: 140%;
	}

	.title-area {
		display: flex;
		padding-bottom: 8px;
		border-bottom: 2px solid rgba(255, 255, 255, 0.2);
	}

	.spacer {
		flex-grow: 1;
	}

	.more-link {
		font-size: 16px;
		font-weight: 600;
		display: flex;
		gap: 4px;
		align-items: center;
	}
</style>
