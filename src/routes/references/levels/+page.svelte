<script lang="ts">
  import DifficultyReference from '@organisms/reference/DifficultyReference.svelte';
</script>

<div class="table-view-container">
  <DifficultyReference />
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
