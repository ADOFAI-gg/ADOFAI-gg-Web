<script lang="ts">
  import { Asset } from '@/utils/assets';
  import axios from 'axios';

  export let icon: string;
  export let namespace = 'icons';
  export let size = 24;
  let className = 'text-white';

  export { className as class };

  const load = async (id: string) => {
    const src = await Asset.icon(id, namespace);

    const { data } = await axios.get(src);

    return data;
  };

  let container: HTMLDivElement;

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
  <div bind:this={container} style="width: {size}px; height: {size}px;" class={className}>
    {@html data}
  </div>
{/await}
