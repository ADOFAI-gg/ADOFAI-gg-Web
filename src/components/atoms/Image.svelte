<script lang="ts">
  export let src: string | null = null;
  export let width: number | null = null;
  export let height: number | null = null;
  export let alt = 'Image';

  const load = async () => {
    await new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = resolve;
      image.onerror = reject;
      image.src = src;
    });
    return src;
  };

  $: promise = load();
</script>

{#await promise}
  <div class={`w-[${width}px] h-[${height}px]`} />
{:then src}
  <img {src} {alt} {width} {height} draggable="false" class="animate-fade-in" />
{:catch _}
  <div />
{/await}
