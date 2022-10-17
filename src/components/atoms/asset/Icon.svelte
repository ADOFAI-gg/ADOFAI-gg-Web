<script lang="ts" context="module">
  const cache = new Map<string, Promise<SVGElement>>();

  const parser = browser ? new DOMParser() : null!;
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
    if (!browser) return null!;

    const src = Asset.icon(id, namespace);

    if (cache.has(src)) return cache.get(src)!;

    const promise = axios.get(src).then((x) => {
      const svg: SVGElement = parser.parseFromString(x.data, 'image/svg+xml').querySelector('svg')!;
      svg.setAttribute('width', `${size}`);
      svg.setAttribute('height', `${size}`);
      svg.querySelectorAll('*')?.forEach((i) => {
        if (i.hasAttribute('fill')) i.setAttribute('fill', 'currentColor');

        if (i.hasAttribute('stroke')) i.setAttribute('stroke', 'currentColor');
      });
      svg.setAttribute('aria-label', alt);

      return svg;
    });

    cache.set(src, promise);

    return promise;
  };

  let container: HTMLDivElement;

  export let disableFade = false;
  export let alt: string;

  $: promise = load(icon);

  $: {
    if (promise && container) {
      promise.then((data) => {
        if (!container) return;
        if (!disableFade) {
          container.classList.add('loaded');
        }
        container.appendChild(data.cloneNode(true));
      });
    }
  }
</script>

<div bind:this={container} class={className} style="width: {size}px; height: {size}px;" />

<style lang="scss">
  .loaded {
    @apply animate-fade-in;
  }
</style>
