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
  let style = 'text-white';

  export { style };

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
  export let alt: string;

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
      svg?.setAttribute('aria-label', alt);
    }
  }

  const sizeStyle = `width: ${size}px; height: ${size}px;`;
</script>

{#await promise}
  <div style={sizeStyle} />
{:then data}
  <div
    bind:this={container}
    style="{sizeStyle} {!disableFade && 'animation: var(--animation-fadein)'} {style}"
  >
    {@html data}
  </div>
{:catch}
  <div style={sizeStyle} />
{/await}
