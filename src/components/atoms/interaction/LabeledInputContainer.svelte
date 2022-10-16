<script lang="ts">
  import Translation from '@/components/utils/Translation.svelte';

  export let label: string;
</script>

<div>
  <div class="translation">
    <Translation key={label} />
  </div>
  <div class="slot">
    <slot />
  </div>
</div>

<style lang="scss">
  .translation {
    opacity: 0.8;
  }

  .slot {
    margin-top: 4px;
  }
</style>
