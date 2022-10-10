<script lang="ts">
  import LabeledInputContainer from '@/components/atoms/LabeledInputContainer.svelte';
  import RangeInputPair from '@/components/atoms/RangeInputPair.svelte';
  import SearchMetaInput from '@/components/atoms/SearchMetaInput.svelte';
  import SearchGroup from '@/components/molecules/levels/SearchGroup.svelte';
  import { searchSetingStore } from '@/stores/search';
  import DifficultyRangeSelector from './DifficultyRangeSelector.svelte';
</script>

<div class="grid md:grid-cols-2 gap-[12px]">
  <SearchGroup title="SEARCH_META_AUTHOR">
    <div class="flex flex-col gap-[16px]">
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
    <div class="flex flex-col gap-[16px]">
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
