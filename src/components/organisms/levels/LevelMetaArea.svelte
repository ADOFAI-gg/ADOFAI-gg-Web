<script lang="ts">
  import DifficultyIcon from '@/components/atoms/DifficultyIcon.svelte';
  import LevelMetaLabelValuePair from '@/components/molecules/levels/LevelMetaLabelValuePair.svelte';
  import type { Level } from '@/types';

  export let level: Level;
</script>

<div class="flex flex-col gap-[26px] h-full">
  <div class="flex gap-[24px]">
    <LevelMetaLabelValuePair label="Lv.">
      <DifficultyIcon difficulty={level.difficulty} size={32} />
    </LevelMetaLabelValuePair>
    <LevelMetaLabelValuePair label="Song Length">Unknown</LevelMetaLabelValuePair>
  </div>
  <div class="flex gap-[24px]">
    <LevelMetaLabelValuePair label="BPM">
      {#if level.minBpm === level.maxBpm}
        {level.minBpm}
      {:else}
        {level.minBpm} - {level.maxBpm}
      {/if}
    </LevelMetaLabelValuePair>
    <LevelMetaLabelValuePair label="Tiles">{level.tiles}</LevelMetaLabelValuePair>
  </div>
  <LevelMetaLabelValuePair label="Tags">TODO</LevelMetaLabelValuePair>

  <div class="flex-grow" />
  bottom(TODO)
</div>
