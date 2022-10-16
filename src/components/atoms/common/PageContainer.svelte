<script lang="ts">
  export let wide = false;
</script>

<div data-wide={wide} class="page-container">
  <div>
    <slot />
  </div>
</div>

<style lang="scss">
  .page-container {
    &[data-wide='false'] {
      padding: 0 4px;

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
