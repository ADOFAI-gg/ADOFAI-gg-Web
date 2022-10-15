<script lang="ts">
  export let src: string | null = null;
  export let width: number | string | null = null;
  export let height: number | string | null = null;
  export let alt: string;
  export let fallback: string | null = null;
  export let lazy = false;
</script>

<img
  loading={lazy ? 'lazy' : 'eager'}
  on:error={() => {
    src = fallback;
  }}
  {src}
  {alt}
  {width}
  {height}
  draggable="false"
/>
