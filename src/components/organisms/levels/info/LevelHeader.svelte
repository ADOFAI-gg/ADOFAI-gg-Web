<script lang="ts">
  import LevelHeaderLinksArea from '@molecules/levels/LevelHeaderLinksArea.svelte';
  import type { Level } from '@/types';
  import { getYoutubeVideoId } from '@/utils/youtube';
  import HorizontalUserList from '@organisms/user/HorizontalUserList.svelte';

  export let level: Level;

  $: youtubeId = getYoutubeVideoId(level.video);
</script>

<header>
  <div
    class="bg-image"
    style="background-image: url(https://i.ytimg.com/vi/{youtubeId}/original.jpg);"
  />
  <div class="bg-image-backdrop" />

  <div class="blank" />

  <div class="content">
    <div class="content__title">{level.title}</div>

    <div class="content__detail-info">
      <div class="content__authors">
        <HorizontalUserList
          allTitle="LEVEL_AUTHORS_CREATOR"
          label="LEVEL_DETAIL_LEVEL_BY"
          users={level.creators}
        />

        <HorizontalUserList
          allTitle="LEVEL_AUTHORS_ARTIST"
          label="LEVEL_DETAIL_MUSIC_BY"
          users={level.music.artists}
        />
      </div>

      <LevelHeaderLinksArea {level} />
    </div>
  </div>
</header>

<style lang="scss">
  header {
    position: relative;
    display: flex;
    width: 100%;
    padding: 0 32px;
  }

  .bg-image {
    position: absolute;
    top: calc(var(--nav-height) * -1);
    left: 0;
    z-index: -10;
    width: 100%;
    height: calc(100% + var(--nav-height));
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    filter: brightness(60%);
  }

  .bg-image-backdrop {
    position: absolute;
    top: calc(var(--nav-height) * -1);
    left: 0;
    z-index: -10;
    width: 100%;
    height: calc(100% + var(--nav-height));
    backdrop-filter: blur(8px);
  }

  .content {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;

    &__title {
      display: flex;
      align-items: flex-end;
      min-height: 140px;
      margin-top: 40px;
      font-weight: 700;
      font-size: 36px;
      text-shadow: 0 0 6px black;
    }

    &__detail-info {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-top: 6px;
      padding: 20px 26px;
      border-radius: 24px 24px 0 0;
      background-color: rgba(var(--color-darkblue), 0.4);

      @media (width >= 768px) {
        flex-direction: row;
      }
    }

    &__authors {
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      gap: 8px;

      @media (width >= 768px) {
        display: block;
        width: 0;
      }
    }
  }
</style>
