<script lang="ts">
  import Translation from '@/components/utils/Translation.svelte';

  export let label: string;
  export let value: string;
</script>

<div class="fair">
  <div class="label">
    <Translation key={label} />
  </div>

  <div class="value">
    <Translation key={value} />
  </div>
</div>

<style lang="scss">
  .fair {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: center;
    width: 0;
    text-align: center;

    .label {
      font-weight: 300;
      font-size: 14px;
    }

    .value {
      font-weight: 500;
      font-size: 16px;
    }
  }
</style>
