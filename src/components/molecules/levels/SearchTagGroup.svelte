<script lang="ts">
  import Icon from '@/components/atoms/Icon.svelte';
  import TagCheckbox from '@/components/atoms/TagCheckbox.svelte';
  import Tooltip from '@/components/atoms/Tooltip.svelte';

  import Translation from '@/components/utils/Translation.svelte';
  import SearchTagGroupBase from './SearchTagGroupBase.svelte';

  export let tags: number[];
  export let title: string;
</script>

<SearchTagGroupBase {title}>
  {#each tags as tag}
    <TagCheckbox {tag} />
  {/each}
</SearchTagGroupBase>
