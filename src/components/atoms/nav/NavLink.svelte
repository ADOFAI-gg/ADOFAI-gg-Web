<script lang="ts">
  export let to: string;
</script>

<a href={to} class="slot">
  <slot />
</a>

<style lang="scss">
  .slot {
    flex-grow: 1;
    font-size: 16px;
    text-align: center;
    opacity: 0.8;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 1;
    }
  }

  @media (min-width: 768px) {
    .slot {
      font-size: 21px;
    }
  }
</style>
