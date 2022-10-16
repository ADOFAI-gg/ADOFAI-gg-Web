<script lang="ts">
  export let href: string;

  export let target = '';
</script>

<a {href} {target}>
  › <slot />
</a>

<style lang="scss">
  a {
    opacity: 0.8;
    transition: opacity 0.2s ease;

    &:hover,
    &:focus {
      opacity: 1;
    }
  }
</style>
