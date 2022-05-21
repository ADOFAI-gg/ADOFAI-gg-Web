<script lang="ts">
  import { Asset } from '@/utils/assets';
  import { compute_rest_props } from 'svelte/internal';

  export let icon: string;
  export let size = 24;

  const load = async (id: string) => {
    const src = await Asset.icon(id);
    await new Promise((resolve, reject) => {
      const image = new window.Image();
      image.onload = resolve;
      image.onerror = reject;
      image.src = src ?? '';
    });
    return src;
  };

  $: promise = load(icon);
</script>

{#await promise}
  <div style="width: {size}px;height: {size}px;" />
{:then url}
  <div
    class="animate-fade-in {$$props.class || 'bg-white'} icon"
    style="width: {size}px;height: {size}px;--url:url({url});"
  />
{/await}

<style lang="scss">
  .icon {
    mask-size: cover;
    mask-position: center;
    mask-image: var(--url);
  }
</style>
