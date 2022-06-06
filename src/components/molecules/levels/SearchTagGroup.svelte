<script lang="ts">
  import TagCheckbox from '@/components/atoms/TagCheckbox.svelte';
  import SearchTagGroupBase from './SearchGroup.svelte';

  export let tags: number[];
  export let title: string;
</script>

<SearchTagGroupBase {title}>
  {#each tags as tag}
    <TagCheckbox {tag} />
  {/each}
</SearchTagGroupBase>
