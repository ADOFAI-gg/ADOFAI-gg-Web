<script lang="ts">
  import SearchTagGroup from '@molecules/levels/SearchTagGroup.svelte';
  import { tagGroups } from '@/utils/tags';
  import MusicTagSearchArea from '@organisms/levels/search/MusicTagSearchArea.svelte';
</script>

<div class="tag-search-tab-container">
  {#each tagGroups as group}
    <SearchTagGroup tags={group.tags} title={`TAG_GROUP_${group.key}`} />
  {/each}
  <MusicTagSearchArea />
</div>

<style lang="scss">
  .tag-search-tab-container {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 20px;

    @media (width >= 768px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
</style>
