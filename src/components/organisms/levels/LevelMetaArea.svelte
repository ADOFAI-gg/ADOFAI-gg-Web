<script lang="ts">
  import Button from '@/components/atoms/Button.svelte';
  import DifficultyIcon from '@/components/atoms/DifficultyIcon.svelte';
  import Icon from '@/components/atoms/Icon.svelte';
  import LevelMetaLabelValuePair from '@/components/molecules/levels/LevelMetaLabelValuePair.svelte';
  import TooltippedTagIcon from '@/components/molecules/TooltippedTagIcon.svelte';
  import type { Level } from '@/types';
  import LevelShareMenu from './LevelShareMenu.svelte';
  import LevelTagDetailsArea from './LevelTagDetailsArea.svelte';

  export let level: Level;

  $: music = level.music;
</script>

<div class="flex flex-col gap-[26px] h-full">
  <div class="flex gap-[24px]">
    <LevelMetaLabelValuePair label="LEVEL_DETAIL_DIFFICULTY">
      <DifficultyIcon difficulty={level.difficulty} size={28} />
    </LevelMetaLabelValuePair>
    <LevelMetaLabelValuePair label="LEVEL_DETAIL_SONG_LENGTH">Unknown</LevelMetaLabelValuePair>
  </div>
  <div class="flex gap-[24px]">
    <LevelMetaLabelValuePair label="LEVEL_DETAIL_BPM">
      {#if music.minBpm === music.maxBpm}
        {music.minBpm}
      {:else}
        {music.minBpm} - {music.maxBpm}
      {/if}
    </LevelMetaLabelValuePair>
    <LevelMetaLabelValuePair label="LEVEL_DETAIL_TILES">{level.tiles}</LevelMetaLabelValuePair>
  </div>
  <LevelMetaLabelValuePair label="LEVEL_DETAIL_TAGS">
    <LevelTagDetailsArea {level} />
  </LevelMetaLabelValuePair>

  <div class="flex-grow" />
  <div class="flex gap-[12px]">
    {#if import.meta.env.VITE_USE_ACCOUNT}
      <Button type="levelAction">
        <div class="flex gap-[6px] items-center">
          <Icon class="text-red" icon="favorite" size={20} />
          <div class="font-regular text-lg">1.4K</div>
        </div>
      </Button>
    {/if}
    <LevelShareMenu {level} />
  </div>
</div>
