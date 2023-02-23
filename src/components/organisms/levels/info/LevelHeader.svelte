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
    <div class="title">{level.title}</div>

    <div class="detail-info">
      <div class="authors">
        <HorizontalUserList
          allTitle="Creator"
          label="LEVEL_DETAIL_LEVEL_BY"
          users={level.creators}
        />

        <HorizontalUserList
          allTitle="Artist"
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
    width: 100%;
    padding: 0 32px;

    .bg-image {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -10;
      width: 100%;
      height: 100%;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      filter: brightness(60%);
    }

    .bg-image-backdrop {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -10;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(8px);
    }

    .blank {
      height: var(--nav-height);
    }

    .content {
      width: 100%;
      max-width: 1100px;
      margin: 0 auto;

      .title {
        display: flex;
        align-items: flex-end;
        min-height: 140px;
        margin-top: 40px;
        font-weight: 700;
        font-size: 36px;
        text-shadow: 0 0 6px black;
      }

      .detail-info {
        display: flex;
        flex-direction: column;
        gap: 14px;
        margin-top: 6px;
        padding: 20px 26px;
        border-radius: 24px 24px 0 0;
        background-color: rgba(var(--color-darkblue), 0.4);

        .authors {
          display: flex;
          flex-grow: 1;
          flex-direction: column;
          gap: 8px;

          @media (min-width: 768px) {
            display: block;
            width: 0;
          }
        }

        @media (min-width: 768px) {
          flex-direction: row;
        }
      }
    }
  }
</style>
