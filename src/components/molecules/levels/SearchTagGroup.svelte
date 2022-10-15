<script lang="ts">
  import TagCheckbox from '@atoms/search/TagCheckbox.svelte';
  import SearchTagGroupBase from '@molecules/levels/SearchGroup.svelte';

  export let tags: number[];
  export let title: string;
</script>

<SearchTagGroupBase {title}>
  {#each tags as tag}
    <TagCheckbox {tag} />
  {/each}
</SearchTagGroupBase>
