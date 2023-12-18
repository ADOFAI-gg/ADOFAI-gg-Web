<script lang="ts">
  import { getIconClass } from '@/utils/icon';

  export let icon: string;
  export let namespace = 'icons';
  export let size = 24;
  export let style = 'color: white;';

  export let alt: string;
</script>

<div
  aria-label={alt}
  role="img"
  style="width: {size}px; height: {size}px; {style}"
  class="icon {getIconClass(icon, namespace)}"
/>

<style lang="scss">
  .icon {
    background-color: currentcolor;
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-image: var(--icon-url);
  }
</style>
