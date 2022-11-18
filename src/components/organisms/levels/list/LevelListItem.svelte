<script lang="ts">
  import DifficultyIcon from '@atoms/asset/DifficultyIcon.svelte';
  import Icon from '@atoms/asset/Icon.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import type { Level } from '@/types';
  import LevelListItemTagList from '@organisms/levels/list/LevelListItemTagList.svelte';

  export let level: Level;
</script>

<a class="level-list-item" href="/levels/{level.id}">
  <div class="info-container">
    <div class="basic-info">
      <div class="difficulty">
        <DifficultyIcon size={42} difficulty={level.difficulty} />

        <div class="id">ID {level.id}</div>
      </div>

      <div class="title-and-authors">
        <div class="title">
          {level.title}
        </div>

        <div class="authors">
          <div class="labels">
            <div><Translation key="LEVEL_DETAIL_MUSIC_BY" /></div>
            <div><Translation key="LEVEL_DETAIL_LEVEL_BY" /></div>
          </div>

          <div class="values">
            <div class="value-wrapper">
              <div class="value">
                {level.music.artists.map((x) => x.name).join(' & ')}
              </div>
            </div>

            <div class="value-wrapper">
              <div class="value">
                {level.creators.map((x) => x.name).join(' & ')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {#if import.meta.env.VITE_USE_ACCOUNT || level.tags.length}
      <div class="additional-info">
        <LevelListItemTagList {level} />

        {#if import.meta.env.VITE_USE_ACCOUNT}
          <div class="hearts">
            {#if level.tags.length}
              <div class="divider" />
            {/if}

            <div class="content">
              <Icon icon="heartOutlined" size={20} alt="Heart Icon" />
              1.4K
            </div>
          </div>
        {/if}
      </div>
    {/if}
  </div>

  <div class="download">
    <a href={level.download} rel="noreferrer" target="_blank">
      <Icon icon="downloadFile" size={48} alt="Download Icon" />
    </a>
  </div>
</a>

<style lang="scss">
  .level-list-item {
    position: relative;
    display: flex;
    gap: 16px;
    padding: 18px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    white-space: nowrap;
    transition: background-color 0.2s ease-in-out;

    &:hover,
    &:focus {
      background-color: rgba(var(--color-darkblue), 0.2);
    }

    .info-container {
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      justify-content: center;
      width: 0;

      @media (min-width: 1024px) {
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
      }
    }

    .basic-info {
      display: flex;
      flex-grow: 1;
      gap: 8px;
      align-items: center;
      width: 100%;

      .difficulty {
        display: flex;
        flex-direction: column;
        gap: 2px;
        align-items: center;
        width: 60px;

        .id {
          font-size: 14px;
          opacity: 0.8;
        }
      }

      .title-and-authors {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        justify-content: space-between;
        width: 0;

        .title {
          overflow-x: clip;
          height: 28px;
          font-weight: 500;
          font-size: 24px;
          line-height: 28px;
          text-overflow: ellipsis;
        }

        .authors {
          display: flex;
          flex-grow: 1;
          gap: 8px;
          align-items: center;
          height: 46px;
          line-height: 16px;

          .labels {
            display: flex;
            flex-direction: column;
            gap: 4px;
            font-weight: 300;
            opacity: 0.6;
          }

          .values {
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            gap: 4px;
            width: 0;
            opacity: 0.8;

            .value-wrapper {
              position: relative;
              height: 16px;

              .value {
                position: absolute;
                overflow-x: hidden;
                width: 100%;
                height: 24px;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }
    }

    .additional-info {
      display: flex;
      align-self: flex-end;
      justify-content: start;
      width: 100%;
      margin-top: 8px;

      .hearts {
        display: flex;
        gap: 12px;
        margin-left: 12px;

        .divider {
          width: 2px;
          height: 100%;
          border-radius: 100em;
          background-color: rgba(232, 232, 232, 0.4);
        }

        .content {
          display: flex;
          gap: 6px;
          align-items: center;
          font-weight: 500;
          font-size: 16px;
        }
      }

      @media (min-width: 1024px) {
        justify-content: flex-end;
        margin-top: 0;
        padding: 11px 0;
      }
    }

    .download {
      position: relative;
      align-self: center;
      width: 48px;
      opacity: 1;

      a {
        position: absolute;
        top: 0;
        right: 0;
        transform: translateY(-50%);
      }
    }
  }
</style>
