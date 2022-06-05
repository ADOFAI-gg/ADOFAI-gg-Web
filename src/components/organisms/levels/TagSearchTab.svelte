<script lang="ts">
  import SearchTagGroup from '@/components/molecules/levels/SearchTagGroup.svelte';
  import { tagGroups } from '@/utils/tags';
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
  {#each $tagGroups as group}
    <SearchTagGroup tags={group.tags} title={`TAG_GROUP_${group.key}`} />
  {/each}
</div>
