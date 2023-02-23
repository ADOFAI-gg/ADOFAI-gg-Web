<script lang="ts">
  import Translation from '@/components/utils/Translation.svelte';

  export let label: string;
</script>

<div class="fair">
  <div class="label"><Translation key={label} /></div>
  <div class="value"><slot /></div>
</div>

<style lang="scss">
  .fair {
    display: flex;
    flex-direction: column;

    .label {
      font-weight: 300;
      font-size: 16px;
      opacity: 0.8;
    }

    .value {
      margin-top: 6px;
      font-weight: 500;
      font-size: 28px;
      line-height: 24px;
    }
  }
</style>
