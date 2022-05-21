<script lang="ts">
  import Button from '@/components/atoms/Button.svelte';
  import DifficultyIcon from '@/components/atoms/DifficultyIcon.svelte';
  import Icon from '@/components/atoms/Icon.svelte';
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
  <div class="flex gap-[12px]">
    <Button type="levelAction">
      <div class="flex gap-[6px] items-center">
        <Icon class="bg-red" icon="favorite" size={20} />
        <div class="font-regular text-lg">1.4K</div>
      </div>
    </Button>
    <Button type="levelAction">
      <Icon icon="share" size={20} />
    </Button>
  </div>
</div>
