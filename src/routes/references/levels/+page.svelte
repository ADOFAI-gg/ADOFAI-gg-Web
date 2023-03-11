<script lang="ts">
  import DifficultyReferenceView from '@/components/organisms/reference/DifficultyReferenceView.svelte';
  import type { DifficultyReference } from '@/types';

  export let data: { references: DifficultyReference[] };
</script>

<div class="table-view-container">
  <DifficultyReferenceView data={data.references} />
</div>

<style lang="scss">
  .table-view-container {
    padding-right: 24px;
    padding-left: 24px;

    @media screen and (min-width: 1280px) {
      padding-right: 120px;
      padding-left: 120px;
    }
  }
</style>
