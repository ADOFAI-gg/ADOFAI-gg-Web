<script lang="ts">
  import MusicLengthSelectItem from '@/components/atoms/MusicLengthSelectItem.svelte';
  import TagCheckbox from '@/components/atoms/TagCheckbox.svelte';

  import SearchTagGroupBase from '@/components/molecules/levels/SearchGroup.svelte';
</script>

<SearchTagGroupBase title="TAG_GROUP_MUSIC">
  <MusicLengthSelectItem tag={1} value="short" />
  <MusicLengthSelectItem icon="lengthMedium" namespace="MUSIC" tag="MEDIUM" value="medium" />
  <MusicLengthSelectItem tag={11} value="long" />
  <TagCheckbox tag={4} />
</SearchTagGroupBase>
