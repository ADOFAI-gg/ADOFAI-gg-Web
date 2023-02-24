<script lang="ts">
  export let wide = false;
  export let navOffset = false;
</script>

<div data-wide={wide} class="page-container" class:nav-offset={navOffset}>
  <div>
    <slot />
  </div>
</div>

<style lang="scss">
  .nav-offset {
    padding-top: var(--nav-height);
  }

  .page-container {
    &[data-wide='false'] {
      padding-right: 34px;
      padding-left: 34px;

      & > div {
        max-width: 1100px;
        margin-right: auto;
        margin-left: auto;
      }
    }

    &[data-wide='true'] {
      & > div {
        padding: 0 16px;

        @media (min-width: 1280px) {
          padding: 0 120px;
        }
      }
    }
  }
</style>
