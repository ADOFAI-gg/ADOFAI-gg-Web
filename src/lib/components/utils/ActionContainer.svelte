<script lang="ts">
	import type { Snippet } from 'svelte'

	type T = $$Generic
	type TParams = $$Generic<Array>

	interface Props {
		action: (...params: TParams) => Promise<T>
		onError?: (e: Error) => void
		children: Snippet<
			[
				{
					run: (...params: TParams) => void
					running: boolean
				}
			]
		>
	}

	const { action, children, onError }: Props = $props()

	let running = $state(false)

	const run = (...args: TParams) => {
		running = true
		action(...args)
			.catch(onError)
			.finally(() => (running = false))
	}
</script>

{@render children({
	run,
	running
})}
