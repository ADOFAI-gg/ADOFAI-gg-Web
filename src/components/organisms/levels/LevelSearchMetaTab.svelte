<script>
  import DifficultySelectorInput from '@/components/atoms/DifficultySelectorInput.svelte';

  import LabeledInputContainer from '@/components/atoms/LabeledInputContainer.svelte';
  import RangeInputPair from '@/components/atoms/RangeInputPair.svelte';
  import SearchMetaInput from '@/components/atoms/SearchMetaInput.svelte';
  import SearchGroup from '@/components/molecules/levels/SearchGroup.svelte';
  import DifficultyRangeSelector from './DifficultyRangeSelector.svelte';
</script>

<div class="grid md:grid-cols-2 gap-[12px]">
  <SearchGroup title="Author">
    <div class="flex flex-col gap-[16px]">
      <LabeledInputContainer label="Artist">
        <SearchMetaInput placeholder="Song Artist" />
      </LabeledInputContainer>
      <LabeledInputContainer label="Creator">
        <SearchMetaInput placeholder="Song Artist" />
      </LabeledInputContainer>
    </div>
  </SearchGroup>
  <SearchGroup title="Level Meta">
    <div class="flex flex-col gap-[16px]">
      <LabeledInputContainer label="Lv.">
        <DifficultyRangeSelector />
      </LabeledInputContainer>
      <LabeledInputContainer label="Tiles">
        <RangeInputPair>
          <SearchMetaInput slot="min" placeholder="Min Tiles" />
          <SearchMetaInput slot="max" placeholder="Max Tiles" />
        </RangeInputPair>
      </LabeledInputContainer>
      <LabeledInputContainer label="BPM">
        <RangeInputPair>
          <SearchMetaInput slot="min" placeholder="Min BPM" />
          <SearchMetaInput slot="max" placeholder="Max BPM" />
        </RangeInputPair>
      </LabeledInputContainer>
    </div>
  </SearchGroup>
</div>
