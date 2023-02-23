<script lang="ts" context="module">
  const icons = import.meta.glob('../../../assets/{icons,tagIcons}/*.svg', {
    eager: true
  });

  const getIconUrl = (id: string, namespace: string) => {
    return (icons[`../../../assets/${namespace}/${id}.svg`] as { default: string } | undefined)
      ?.default;
  };
</script>

<script lang="ts">
  export let icon: string;
  export let namespace = 'icons';
  export let size = 24;
  export let style = 'color: white;';

  export let alt: string;

  $: url = getIconUrl(icon, namespace);
</script>

<div
  aria-label={alt}
  style="
/* stylelint-disable-next-line max-empty-lines */

--icon-url: url('{url}');

width: {size}px; height: {size}px; {style}"
  class="icon"
/>

<style lang="scss">
  .icon {
    background-color: currentcolor;
    mask-size: cover;
    mask-image: var(--icon-url);
  }
</style>
