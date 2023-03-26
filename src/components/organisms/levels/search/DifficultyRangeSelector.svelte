<script lang="ts" context="module">
  const convertDifficulty = (v: string) => {
    switch (v) {
      case 101:
        return '-1';
      case 0.1:
        return 'tiny';
      default:
        return v;
    }
  };
</script>

<script lang="ts">
  import DifficultySelectorInput from '@atoms/search/DifficultySelectorInput.svelte';

  import RangeInputPair from '@atoms/interaction/RangeInputPair.svelte';
  import { parsedQuery, searchSettingStore } from '@/stores/search';
  import { encodeSearchString, parseSearchString } from '@/utils/search';

  $: parsed = parseSearchString($searchSettingStore.query);

  const onChangeMin = (e: CustomEvent) => {
    const value = e.detail.value;

    const filtered = parsed.filter((x) => x.type !== 'minDifficulty');

    if (value) {
      const index = parsed.findIndex((x) => x.type === 'minDifficulty');

      filtered.splice(index < 0 ? 0 : index, 0, {
        quote: null,
        type: 'minDifficulty',
        value: convertDifficulty(value)
      });
    }

    $searchSettingStore.query = encodeSearchString(filtered);
  };

  const onChangeMax = (e: CustomEvent) => {
    const filtered = parsed.filter((x) => x.type !== 'maxDifficulty');

    const value = e.detail.value;

    if (value) {
      const index = parsed.findIndex((x) => x.type === 'maxDifficulty');

      const finalIndex = index < 0 ? 0 : index;

      filtered.splice(finalIndex, 0, {
        quote: null,
        type: 'maxDifficulty',
        value: convertDifficulty(value)
      });

      if ($parsedQuery.minDifficulty) {
        if ($parsedQuery.minDifficulty > value) {
          filtered[finalIndex].value = `${$parsedQuery.minDifficulty}`;
        }
      }
    }

    $searchSettingStore.query = encodeSearchString(filtered);
  };
</script>

<RangeInputPair>
  <DifficultySelectorInput
    bind:value={$parsedQuery.minDifficulty}
    on:change={onChangeMin}
    placeholder="SEARCH_META_LV_MIN"
    slot="min"
  />
  <DifficultySelectorInput
    bind:value={$parsedQuery.maxDifficulty}
    on:change={onChangeMax}
    placeholder="SEARCH_META_LV_MAX"
    slot="max"
  />
</RangeInputPair>
