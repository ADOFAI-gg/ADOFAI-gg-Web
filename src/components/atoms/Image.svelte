<script lang="ts">
  export let src: string | null = null;
  export let width: number | string | null = null;
  export let height: number | string | null = null;
  export let alt = 'Image';

  const load = async () => {
    await new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = resolve;
      image.onerror = reject;
      image.src = src ?? '';
    });
    return src;
  };

  const format = (str: string | number | null) => {
    const num = Number(str);
    if (isNaN(num)) return str;
    return `${str}px`;
  };

  $: promise = load();
</script>

{#await promise}
  <div style="width:{format(width)};height:{format(height)}" />
{:then src}
  <img {src} {alt} {width} {height} draggable="false" class="animate-fade-in" />
{:catch _}
  <div style="width:{format(width)};height:{format(height)}" />
{/await}
