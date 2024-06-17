<script lang="ts">
  import type { SvelteVirtualizer, VirtualItem } from '@tanstack/svelte-virtual';
  import type { Readable } from 'svelte/store';

  let el: HTMLDivElement | null = null;
  export let virtualizer: Readable<SvelteVirtualizer<Window, HTMLDivElement>>;
  export let item: VirtualItem;

  $: if (el) $virtualizer.measureElement(el);
</script>

<div bind:this={el} data-index={item.index}>
  <slot />
</div>
