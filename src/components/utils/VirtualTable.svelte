<script lang="ts">
  import Table from '../atoms/table/Table.svelte';

  import { createEventDispatcher, onDestroy, onMount, tick } from 'svelte';

  type T = $$Generic; /* eslint-disable-line no-undef */

  export let data: T[];

  export let total: number;

  export let threshold = 10;

  let mounted = false;

  let root: HTMLElement;

  $: if (mounted) refresh(data, window.innerHeight);

  $: if (data.length) onScroll();

  let averageHeight = 0;

  async function onScroll() {
    if (!root) return;

    const oldStart = startIndex;

    for (let v = 0; v < rows.length; v++) {
      const row = rows[v];
      if (!row) break;
      heightMap[startIndex + v] = row.offsetHeight;
    }

    let i = 0;
    let y = 0;

    const scrollTop = window.scrollY;

    const offset = root.getBoundingClientRect().y + window.scrollY;

    while (i < data.length) {
      const rowHeight = heightMap[i];

      if (y + rowHeight > scrollTop - offset) {
        startIndex = i;
        top = y;

        break;
      }

      y += rowHeight;
      i += 1;
    }

    while (i < data.length) {
      y += heightMap[i];
      i += 1;

      if (y > scrollTop + window.innerHeight) break;
    }

    endIndex = i;

    const remaining = data.length - endIndex;

    averageHeight = y / endIndex;

    while (i < data.length) heightMap[i++] = averageHeight;

    bottom = remaining * averageHeight;

    if (startIndex < oldStart) {
      await tick();

      let expected = 0;
      let actual = 0;

      for (let i = 0; i < oldStart; i++) {
        if (rows[i - startIndex]) {
          expected += heightMap[i];
          actual += rows[i - startIndex].offsetHeight;
        }
      }

      const d = actual - expected;

      window.scrollTo(window.scrollX, scrollTop + d);
    }
  }

  onMount(() => {
    window.addEventListener('scroll', onScroll);

    // scrollY = scroller.scrollTop;

    window.addEventListener('resize', onScroll);

    mounted = true;
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', onScroll);

      window.removeEventListener('resize', onScroll);
    }

    mounted = false;
  });

  let top = 0;
  let bottom = 0;

  let startIndex = 0;
  let endIndex = 0;

  let rows: HTMLElement[] = [];

  const heightMap: number[] = [];

  async function refresh(items: T[], viewportHeight: number) {
    const scrollTop = window.scrollY;

    await tick();

    let contentHeight = top - scrollTop;

    let i = startIndex;

    while (contentHeight < viewportHeight && i < items.length) {
      let row = rows[i - startIndex];

      if (!row) {
        endIndex = i + 1;

        await tick();

        row = rows[i - startIndex];
      }

      if (!row) return;

      const rowHeight = (heightMap[i] = row.offsetHeight);

      contentHeight += rowHeight;

      i++;
    }
  }

  $: hasMore = total > data.length;

  const dispatch = createEventDispatcher();

  let lastLength = 0;

  let updating = false;

  $: {
    if (endIndex > data.length - threshold && hasMore && !updating) {
      updating = true;
      dispatch('more', { offset: data.length });
    }
  }

  $: {
    if (data.length !== lastLength) {
      updating = false;
      lastLength = data.length;
    }
  }

  $: sliced = data.slice(startIndex, endIndex).map((x, i) => ({ item: x, index: i }));
</script>

<div bind:this={root} style="padding-bottom: {bottom}px;">
  <Table {$$restProps}>
    <slot name="cols" />
    <slot name="head" />
    <tbody>
      {#if top}
        <tr style="height: {top}px;" />
      {/if}
      {#each sliced as { item, index } (startIndex + index)}
        <tr bind:this={rows[index]}>
          <slot {item} />
        </tr>
      {/each}
    </tbody>
  </Table>
</div>

{#if hasMore}
  <slot name="loading" />
{/if}

<div style=" position: fixed; bottom: 0; left: 0">{startIndex} - {endIndex}</div>
