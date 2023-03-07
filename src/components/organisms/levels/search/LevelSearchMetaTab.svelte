<script lang="ts">
  import LabeledInputContainer from '@atoms/interaction/LabeledInputContainer.svelte';
  import RangeInputPair from '@atoms/interaction/RangeInputPair.svelte';
  import SearchMetaInput from '@atoms/search/SearchMetaInput.svelte';
  import SearchGroup from '@molecules/levels/SearchGroup.svelte';
  import { parsedQuery, searchSetingStore } from '@/stores/search';
  import DifficultyRangeSelector from '@organisms/levels/search/DifficultyRangeSelector.svelte';
  import { encodeSearchString, parseSearchString, SearchStringAnalyzer } from '@/utils/search';

  $: parsed = parseSearchString($searchSetingStore.query);

  const onChangeArtist = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;

    const filtered = parsed.filter((x) => x.type !== 'artist');

    if (value) {
      const index = parsed.findIndex((x) => x.type === 'artist');

      filtered.splice(index < 0 ? 0 : index, 0, {
        quote: value.includes(' ') ? '"' : null,
        type: 'artist',
        value
      });
    }

    $searchSetingStore.query = encodeSearchString(filtered);
  };

  const onChangeCreator = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;

    const filtered = parsed.filter((x) => x.type !== 'creator');

    if (value) {
      const index = parsed.findIndex((x) => x.type === 'creator');

      filtered.splice(index < 0 ? 0 : index, 0, {
        quote: value.includes(' ') ? '"' : null,
        type: 'creator',
        value
      });
    }

    $searchSetingStore.query = encodeSearchString(filtered);
  };

  const onChangeMinTiles = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;

    const filtered = parsed.filter((x) => x.type !== 'minTiles');

    if (value) {
      const index = parsed.findIndex((x) => x.type === 'minTiles');

      filtered.splice(index < 0 ? 0 : index, 0, {
        quote: null,
        type: 'minTiles',
        value
      });
    }

    $searchSetingStore.query = encodeSearchString(filtered);
  };

  const onChangeMaxTiles = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;

    const filtered = parsed.filter((x) => x.type !== 'maxTiles');

    if (value) {
      const index = parsed.findIndex((x) => x.type === 'maxTiles');

      filtered.splice(index < 0 ? 0 : index, 0, {
        quote: null,
        type: 'maxTiles',
        value
      });
    }

    $searchSetingStore.query = encodeSearchString(filtered);
  };

  const onChangeMinBPM = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;

    const filtered = parsed.filter((x) => x.type !== 'minBpm');

    if (value) {
      const index = parsed.findIndex((x) => x.type === 'minBpm');

      filtered.splice(index < 0 ? 0 : index, 0, {
        quote: null,
        type: 'minBpm',
        value
      });
    }

    $searchSetingStore.query = encodeSearchString(filtered);
  };

  const onChangeMaxBPM = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;

    const filtered = parsed.filter((x) => x.type !== 'maxBpm');

    if (value) {
      const index = parsed.findIndex((x) => x.type === 'maxBpm');

      filtered.splice(index < 0 ? 0 : index, 0, {
        quote: null,
        type: 'maxBpm',
        value
      });
    }

    $searchSetingStore.query = encodeSearchString(filtered);
  };
</script>

<div class="meta">
  <SearchGroup title="SEARCH_META_AUTHOR">
    <div class="meta-group">
      <LabeledInputContainer label="SEARCH_META_ARTIST_LABEL">
        <SearchMetaInput
          on:input={onChangeArtist}
          value={$parsedQuery.artist}
          placeholder="SEARCH_META_ARTIST_PLACEHOLDER"
        />
      </LabeledInputContainer>
      <LabeledInputContainer label="SEARCH_META_CREATOR_LABEL">
        <SearchMetaInput
          on:input={onChangeCreator}
          value={$parsedQuery.creator}
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
            value={$parsedQuery.minTiles}
            on:input={onChangeMinTiles}
            slot="min"
            min={0}
            type="number"
            placeholder="SEARCH_META_TILES_MIN"
          />
          <SearchMetaInput
            value={$parsedQuery.maxTiles}
            on:input={onChangeMaxTiles}
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
            value={$parsedQuery.minBpm}
            on:input={onChangeMinBPM}
            slot="min"
            min={0}
            type="number"
            placeholder="SEARCH_META_BPM_MIN"
          />
          <SearchMetaInput
            value={$parsedQuery.maxBpm}
            on:input={onChangeMaxBPM}
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
  .meta {
    display: grid;
    gap: 12px;

    &-group {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
</style>
