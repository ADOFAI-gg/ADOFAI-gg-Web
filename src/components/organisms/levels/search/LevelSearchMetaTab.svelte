<script lang="ts">
  import LabeledInputContainer from '@atoms/interaction/LabeledInputContainer.svelte';
  import RangeInputPair from '@atoms/interaction/RangeInputPair.svelte';
  import SearchMetaInput from '@atoms/search/SearchMetaInput.svelte';
  import SearchGroup from '@molecules/levels/SearchGroup.svelte';
  import { parsedQuery, searchSettingStore } from '@/stores/search';
  import DifficultyRangeSelector from '@organisms/levels/search/DifficultyRangeSelector.svelte';
  import { encodeSearchString, parseSearchString } from '@/utils/search';

  $: parsed = parseSearchString($searchSettingStore.query);

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

    $searchSettingStore.query = encodeSearchString(filtered);
  };

  const onChangeSong = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;

    const filtered = parsed.filter((x) => x.type !== 'song');

    if (value) {
      const index = parsed.findIndex((x) => x.type === 'song');

      filtered.splice(index < 0 ? 0 : index, 0, {
        quote: value.includes(' ') ? '"' : null,
        type: 'song',
        value
      });
    }

    $searchSettingStore.query = encodeSearchString(filtered);
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

    $searchSettingStore.query = encodeSearchString(filtered);
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

    $searchSettingStore.query = encodeSearchString(filtered);
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

    $searchSettingStore.query = encodeSearchString(filtered);
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

    $searchSettingStore.query = encodeSearchString(filtered);
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

    $searchSettingStore.query = encodeSearchString(filtered);
  };
</script>

<div class="meta">
  <SearchGroup title="search:meta-group-credit">
    <div class="meta-group">
      <LabeledInputContainer key="search:meta-field-artist">
        <SearchMetaInput
          on:input={onChangeArtist}
          value={$parsedQuery.artist}
          placeholder="search:meta-field-artist-placeholder"
        />
      </LabeledInputContainer>
      <LabeledInputContainer key="search:meta-field-song">
        <SearchMetaInput
          on:input={onChangeSong}
          value={$parsedQuery.song}
          placeholder="search:meta-field-song-placeholder"
        />
      </LabeledInputContainer>
      <LabeledInputContainer key="search:meta-field-creator-label">
        <SearchMetaInput
          on:input={onChangeCreator}
          value={$parsedQuery.creator}
          placeholder="search:meta-field-creator-placeholder"
        />
      </LabeledInputContainer>
    </div>
  </SearchGroup>
  <SearchGroup title="search:meta-group-level">
    <div class="meta-group">
      <LabeledInputContainer key="search:meta-field-difficulty-label">
        <DifficultyRangeSelector />
      </LabeledInputContainer>
      <LabeledInputContainer key="search:meta-field-tiles-label">
        <RangeInputPair>
          <SearchMetaInput
            value={$parsedQuery.minTiles}
            on:input={onChangeMinTiles}
            slot="min"
            min={0}
            type="number"
            placeholder="search:meta-field-tiles-placeholder-min"
          />
          <SearchMetaInput
            value={$parsedQuery.maxTiles}
            on:input={onChangeMaxTiles}
            slot="max"
            min={0}
            type="number"
            placeholder="search:meta-field-tiles-placeholder-max"
          />
        </RangeInputPair>
      </LabeledInputContainer>
      <LabeledInputContainer key="search:meta-field-bpm-label">
        <RangeInputPair>
          <SearchMetaInput
            value={$parsedQuery.minBpm}
            on:input={onChangeMinBPM}
            slot="min"
            min={0}
            type="number"
            placeholder="search:meta-field-bpm-placeholder-min"
          />
          <SearchMetaInput
            value={$parsedQuery.maxBpm}
            on:input={onChangeMaxBPM}
            slot="max"
            min={0}
            type="number"
            placeholder="search:meta-field-bpm-placeholder-max"
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

    @media (width >= 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
</style>
