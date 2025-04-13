<script lang="ts">
	import { Icon } from '@adofai-gg/ui'
	import type { Snippet } from 'svelte'

	interface Props {
		children: Snippet
		href: string
	}

	const { children, href }: Props = $props()
</script>

<a class="main-link" {href}>
	<Icon alt="paper icon" icon="paper" size={18} />
	{@render children()}
</a>

<style lang="scss">
	.main-link {
		--opacity: 0.4;

		display: flex;
		gap: 2px;
		align-items: center;
		color: rgba(255, 255, 255, var(--opacity));
		transition: color ease 0.2s;

		&:hover {
			--opacity: 1;
		}
	}
</style>
