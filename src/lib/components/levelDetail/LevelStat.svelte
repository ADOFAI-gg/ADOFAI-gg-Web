<script lang="ts">
	import { type TranslationKey, Translation } from '@adofai-gg/ui'
	import type { Snippet } from 'svelte'

	interface Props {
		key: TranslationKey
		children: Snippet
	}

	const { key, children }: Props = $props()
</script>

<div class="level-stat">
	<div class="label">
		<Translation {key} />
	</div>
	<div class="content">
		{@render children()}
	</div>
</div>

<style lang="scss">
	.label {
		color: rgba(255, 255, 255, 0.6);
		font-weight: 400;
		font-size: 14px;
		line-height: 120%;
	}

	.content {
		font-weight: 500;
		font-size: 26px;
		line-height: 120%;
	}
</style>
