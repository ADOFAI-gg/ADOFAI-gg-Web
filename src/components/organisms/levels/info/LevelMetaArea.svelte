<script lang="ts">
  import DifficultyIcon from '@atoms/asset/DifficultyIcon.svelte';
  import LevelMetaLabelValuePair from '@molecules/levels/LevelMetaLabelValuePair.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import type { Level } from '@/types';
  import LevelShareMenu from '@organisms/levels/info/LevelShareMenu.svelte';
  import LevelTagDetailsArea from '@organisms/levels/info/LevelTagDetailsArea.svelte';

  $: convertLength = (length: number): [string, number] => {
    const seconds = Math.floor(length % 60);
    const minutes = Math.floor((length / 60) % 60);
    const hours = Math.floor(length / 3600);

    if (!minutes) {
      const v = seconds - Math.ceil(seconds / 5);
      return ['seconds', v];
    }

    if (!hours) {
      return ['minutes', minutes];
    }

    return ['hours', hours];
  };

  export let level: Level;

  // eslint-disable-next-line no-undef
  export let video: YT.Player | null;

  $: music = level.music;

  $: length = (() => {
    if (video) {
      return video.getDuration();
    }

    if (level.tags.find((x) => x.id === 11)) return 'long';

    if (level.difficulty === 0.1) return 'short';

    return 'medium';
  })();

  $: videoLength = typeof length === 'number' ? convertLength(length) : undefined;
</script>

<section>
  <div class="horizontal">
    <LevelMetaLabelValuePair label="level-details:difficulty">
      <DifficultyIcon difficulty={level.difficulty} size={28} censored={level.censored} />
    </LevelMetaLabelValuePair>

    <LevelMetaLabelValuePair label="level-details:song-length">
      <Translation
        params={videoLength && {
          time: videoLength[1],
          timeUnit: videoLength[0]
        }}
        key={typeof length === 'number' ? 'tags:length-from-video' : `tags:length-${length}-name`}
      />
    </LevelMetaLabelValuePair>
  </div>

  <div class="horizontal">
    <LevelMetaLabelValuePair label="level-details:bpm">
      {#if music.minBpm === music.maxBpm}
        {music.minBpm}
      {:else}
        {music.minBpm} - {music.maxBpm}
      {/if}
    </LevelMetaLabelValuePair>

    <LevelMetaLabelValuePair label="level-details:tiles">
      {level.tiles}
    </LevelMetaLabelValuePair>
  </div>

  <LevelMetaLabelValuePair label="level-details:tags">
    <LevelTagDetailsArea {level} />
  </LevelMetaLabelValuePair>

  <div class="blank" />

  <div class="buttons">
    <!-- TODO: uncomment after backend implements likes feature
    <Button type="levelAction">
      <div class="buttons__like-container">
        <Icon style="color: rgba(var(--color-red), 1);" icon="heart" size={20} alt="Heart Icon" />

        <div class="buttons__like-container-text">1.4K</div>
      </div>
    </Button>
    -->

    <LevelShareMenu {level} />
  </div>
</section>

<style lang="scss">
  section {
    display: flex;
    flex-direction: column;
    gap: 26px;
    height: 100%;
  }

  .horizontal {
    display: flex;
    gap: 24px;
  }

  .blank {
    flex-grow: 1;
  }

  .buttons {
    display: flex;
    gap: 12px;

    /* TODO: uncomment after backend implements likes feature
    &__like-container {
      display: flex;
      gap: 6px;
      align-items: center;

      &-text {
        font-weight: 400;
        font-size: 16px;
      }
    }
    */
  }
</style>
