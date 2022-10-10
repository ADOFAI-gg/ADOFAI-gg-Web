<script lang="ts" context="module">
  const cache = new Map<string, Promise<string>>();
</script>

<script lang="ts">
  import { browser } from '$app/environment';

  import { Asset } from '@/utils/assets';
  import axios from 'axios';

  export let icon: string;
  export let namespace = 'icons';
  export let size = 24;
  let className = 'text-white';

  export { className as class };

  const load = async (id: string) => {
    if (!browser) return;

    const src = Asset.icon(id, namespace);

    if (cache.has(src)) return cache.get(src);

    const promise = axios.get(src).then((x) => x.data);

    cache.set(src, promise);

    return promise;
  };

  let container: HTMLDivElement;

  export let disableFade = false;

  $: promise = load(icon);

  $: {
    if (container) {
      const svg = container.querySelector('svg');
      svg?.setAttribute('width', `${size}`);
      svg?.setAttribute('height', `${size}`);
      svg?.querySelectorAll('*')?.forEach((i) => {
        if (i.hasAttribute('fill')) i.setAttribute('fill', 'currentColor');

        if (i.hasAttribute('stroke')) i.setAttribute('stroke', 'currentColor');
      });
    }
  }
</script>

{#await promise}
  <div style="width: {size}px;height: {size}px;" />
{:then data}
  <div
    bind:this={container}
    style="width: {size}px; height: {size}px;"
    class={className}
    class:animate-fade-in={!disableFade}
  >
    {@html data}
  </div>
{:catch}
  <div style="width: {size}px; height: {size}px;" />
{/await}
