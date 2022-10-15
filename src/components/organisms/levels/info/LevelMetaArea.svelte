<script lang="ts">
  import Button from '@atoms/interaction/Button.svelte';
  import DifficultyIcon from '@atoms/asset/DifficultyIcon.svelte';
  import Icon from '@atoms/asset/Icon.svelte';
  import LevelMetaLabelValuePair from '@molecules/levels/LevelMetaLabelValuePair.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import type { Level } from '@/types';
  import { currentLang, fallbackLang, langData } from '@/utils/i18n';
  import LevelShareMenu from '@organisms/levels/info/LevelShareMenu.svelte';
  import LevelTagDetailsArea from '@organisms/levels/info/LevelTagDetailsArea.svelte';

  const convertLength = (length: number) => {
    const lang = $langData;

    const current = $currentLang;

    const fallback = fallbackLang;

    const unit = (name: string, v: number) => {
      let key = `TIME_UNIT_${name}`;

      if (v > 1) {
        key += 'S';
      }

      return (lang[current]?.[key] || lang[fallback]?.[key] || key).split('{value}').join(`${v}`);
    };

    const seconds = Math.floor(length % 60);
    const minutes = Math.floor((length / 60) % 60);
    const hours = Math.floor(length / 3600);

    if (!minutes) {
      const v = seconds - Math.ceil(seconds / 5);
      return unit('SECOND', v);
    }

    if (!hours) {
      return unit('MINUTE', minutes);
    }

    return unit('HOUR', hours);
  };

  export let level: Level;

  // eslint-disable-next-line no-undef
  export let video: YT.Player | null;

  $: music = level.music;

  $: length = (() => {
    if (video) {
      return video.getDuration();
    }

    if (level.tags.find((x) => x.id === 11)) return 'LONG';

    if (level.difficulty === 0.1) return 'SHORT';

    return 'MEDIUM';
  })();
</script>

<div class="flex flex-col gap-[26px] h-full">
  <div class="flex gap-[24px]">
    <LevelMetaLabelValuePair label="LEVEL_DETAIL_DIFFICULTY">
      <DifficultyIcon difficulty={level.difficulty} size={28} />
    </LevelMetaLabelValuePair>
    <LevelMetaLabelValuePair label="LEVEL_DETAIL_SONG_LENGTH">
      <Translation
        params={typeof length === 'number'
          ? {
              time: convertLength(length)
            }
          : undefined}
        key={typeof length === 'number' ? 'LENGTH_VIDEO' : `LENGTH_${length}`}
      />
    </LevelMetaLabelValuePair>
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
          <Icon class="text-red" icon="heart" size={20} alt="Heart Icon" />
          <div class="font-regular text-lg">1.4K</div>
        </div>
      </Button>
    {/if}
    <LevelShareMenu {level} />
  </div>
</div>
