<script lang="ts">
  import Translation from '@/components/utils/Translation.svelte';

  export let label: string;
  export let value: string;
</script>

<div class="pair">
  <div class="pair__label">
    <Translation key={label} />
  </div>

  <div class="pair__value">
    <Translation key={value} />
  </div>
</div>

<style lang="scss">
  .pair {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: center;
    width: 0;
    text-align: center;

    &__label {
      font-weight: 300;
      font-size: 14px;
    }

    &__value {
      font-weight: 500;
      font-size: 16px;
    }
  }
</style>
