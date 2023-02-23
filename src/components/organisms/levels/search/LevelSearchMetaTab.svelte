<script lang="ts">
  import LabeledInputContainer from '@atoms/interaction/LabeledInputContainer.svelte';
  import RangeInputPair from '@atoms/interaction/RangeInputPair.svelte';
  import SearchMetaInput from '@atoms/search/SearchMetaInput.svelte';
  import SearchGroup from '@molecules/levels/SearchGroup.svelte';
  import { searchSetingStore } from '@/stores/search';
  import DifficultyRangeSelector from '@organisms/levels/search/DifficultyRangeSelector.svelte';
</script>

<div class="meta-container">
  <SearchGroup title="SEARCH_META_AUTHOR">
    <div class="meta-group">
      <LabeledInputContainer label="SEARCH_META_ARTIST_LABEL">
        <SearchMetaInput
          bind:value={$searchSetingStore.query.artist}
          placeholder="SEARCH_META_ARTIST_PLACEHOLDER"
        />
      </LabeledInputContainer>
      <LabeledInputContainer label="SEARCH_META_CREATOR_LABEL">
        <SearchMetaInput
          bind:value={$searchSetingStore.query.creator}
          placeholder="SEARCH_META_CREATOR_PLACEHOLDER"
        />
      </LabeledInputContainer>
    </div>
  </SearchGroup>
  <SearchGroup title="SEARCH_META_LEVEL">
    <div class="meta-group">
      <LabeledInputContainer label="SEARCH_META_LV_LABEL">
        <DifficultyRangeSelector />
      </LabeledInputContainer>
      <LabeledInputContainer label="SEARCH_META_TILES_LABEL">
        <RangeInputPair>
          <SearchMetaInput
            bind:value={$searchSetingStore.filter.tiles.min}
            slot="min"
            min={0}
            type="number"
            placeholder="SEARCH_META_TILES_MIN"
          />
          <SearchMetaInput
            bind:value={$searchSetingStore.filter.tiles.max}
            slot="max"
            min={0}
            type="number"
            placeholder="SEARCH_META_TILES_MAX"
          />
        </RangeInputPair>
      </LabeledInputContainer>
      <LabeledInputContainer label="SEARCH_META_BPM_LABEL">
        <RangeInputPair>
          <SearchMetaInput
            bind:value={$searchSetingStore.filter.bpm.min}
            slot="min"
            min={0}
            type="number"
            placeholder="SEARCH_META_BPM_MIN"
          />
          <SearchMetaInput
            bind:value={$searchSetingStore.filter.bpm.max}
            slot="max"
            min={0}
            type="number"
            placeholder="SEARCH_META_BPM_MAX"
          />
        </RangeInputPair>
      </LabeledInputContainer>
    </div>
  </SearchGroup>
</div>

<style lang="scss">
  .meta-container {
    display: grid;
    gap: 12px;

    .meta-group {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
</style>
