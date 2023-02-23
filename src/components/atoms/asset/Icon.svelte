<script lang="ts" context="module">
  const cache = new Map<string, SVGElement>();

  const parser = browser ? new DOMParser() : (null as unknown as DOMParser);

  const getIconString = (id: string, namespace: string) => {
    return svgIcons[`../assets/${namespace}/${id}.svg`];
  };

  const load = (id: string, namespace: string) => {
    if (!browser) return null as unknown as SVGElement;

    const cacheKey = `${namespace}:${id}`;

    if (cache.has(cacheKey)) return cache.get(cacheKey) as SVGElement;

    const icon = getIconString(id, namespace);

    // TODO: preprocess at assets repository
    const svg: SVGElement = parser
      .parseFromString(icon, 'image/svg+xml')
      .querySelector('svg') as SVGElement;
    svg.querySelectorAll('*')?.forEach((i) => {
      if (i.hasAttribute('fill')) i.setAttribute('fill', 'currentColor');

      if (i.hasAttribute('stroke')) i.setAttribute('stroke', 'currentColor');
    });

    cache.set(cacheKey, svg);

    return svg;
  };
</script>

<script lang="ts">
  import { browser } from '$app/environment';

  import { svgIcons } from '@/utils/assets';

  export let icon: string;
  export let namespace = 'icons';
  export let size = 24;
  export let style = 'color: white;';

  let container: HTMLDivElement;

  export let alt: string;

  $: instance = load(icon, namespace);

  $: {
    if (instance && container) {
      const svg = instance.cloneNode(true) as SVGElement;

      svg.setAttribute('width', `${size}`);
      svg.setAttribute('height', `${size}`);
      svg.setAttribute('aria-label', alt);

      container.replaceChildren(svg);
    }
  }
</script>

<div bind:this={container} class="icon" style="width: {size}px; height: {size}px; {style}" />
