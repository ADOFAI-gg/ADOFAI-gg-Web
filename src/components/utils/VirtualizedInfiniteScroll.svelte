<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';
  import LoadingSpinner from '../atoms/LoadingSpinner.svelte';

  export let data: any[];

  export let total: number;

  export let threshold = 10;

  export let itemHeight: number;

  export let gap = 0;

  export let scrollContainerSelector = '.simplebar-content-wrapper';

  $: totalHeight = (data.length - 1) * itemHeight + (gap * (data.length - 1) - gap);

  let scrollY = 0;

  let scroller: HTMLElement;

  const onScroll = () => {
    scrollY = scroller.scrollTop;
  };

  const updateOffset = () => {
    if (top != scroller.offsetTop) {
      top = scroller.offsetTop;
    }
  };

  onMount(() => {
    scroller = document.querySelector(scrollContainerSelector)!;

    scroller.addEventListener('scroll', onScroll);

    scroller.addEventListener('resize', updateOffset);

    scrollY = scroller.scrollTop;

    updateOffset();

    calculate();
  });

  onDestroy(() => {
    scroller.removeEventListener('scroll', onScroll);

    scroller.removeEventListener('resize', updateOffset);
  });

  let top = 0;

  let startIndex = 0;
  let endIndex = 0;

  $: calculate = () => {
    const offset = Math.max(scrollY - top, 0);
    const start = Math.floor(offset / (itemHeight + gap));
    const count = Math.ceil((scrollY - top + scroller.clientHeight - offset) / (itemHeight + gap));

    if (startIndex != start) startIndex = start;

    const end = Math.min(start + count, data.length - 1);

    if (endIndex != end) endIndex = end;
  };

  $: {
    if (scroller) {
      calculate();
    }
  }

  $: hasMore = total > data.length;

  const dispatch = createEventDispatcher();

  $: {
    if (endIndex > data.length - threshold && hasMore) {
      dispatch('more', { offset: data.length });
    }
  }

  $: sliced = data.slice(startIndex, endIndex).map((x, i) => ({ item: x, index: i }));
</script>

<div>
  <div style="height: {totalHeight}px;" class="relative">
    {#each sliced as { item, index } (startIndex + index)}
      <div
        style="height: {itemHeight}px; top: {itemHeight * (startIndex + index) +
          gap * (startIndex + index)}px;"
        class="absolute left-0 w-full"
      >
        <slot {item} />
      </div>
    {/each}
  </div>

  {#if hasMore}
    <div class="w-full my-4 flex justify-center">
      <LoadingSpinner size={48} />
    </div>
  {/if}
</div>
