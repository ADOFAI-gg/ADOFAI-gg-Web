<script lang="ts">
  import MusicLengthSelectItem from '@atoms/search/MusicLengthSelectItem.svelte';
  import TagCheckbox from '@atoms/search/TagCheckbox.svelte';

  import SearchTagGroupBase from '@molecules/levels/SearchGroup.svelte';
</script>

<SearchTagGroupBase title="tags:group-music">
  <MusicLengthSelectItem tag={1} value="short" />
  <MusicLengthSelectItem icon="lengthMedium" namespace="music" tag="medium" value="medium" />
  <MusicLengthSelectItem tag={11} value="long" />
  <TagCheckbox tag={4} />
</SearchTagGroupBase>
