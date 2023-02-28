<script lang="ts">
  import HomeLogoImage from '@atoms/home/HomeLogoImage.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import { type SyncStatusResponse, SyncStatus } from '@/types';
  import { currentLang } from '@/utils/i18n';

  const forumLinkReplacer = (html: string) => {
    return html.replace(
      /<forumLink>(.+?)<\/forumLink>/g,
      `<a
        class="forum-link"
        href="https://docs.google.com/spreadsheets/d/1PzLHfWmVWJHrBGnNSsLTsdH0ibdk0hB4MpKHET1nkpU/edit#gid=1848316468"
        rel="noreferrer"
        target="_blank"
      >
        $1
      </a>`
    );
  };

  export let syncStatus: SyncStatusResponse;

  $: lastSyncedAt = new Date(syncStatus.lastSucceedAt).toLocaleTimeString($currentLang);
</script>

<div class="home-logo">
  <HomeLogoImage />

  <span class="home-logo__description">
    <Translation key="HOME_HERO_DESCRIPTION" htmlReplacer={forumLinkReplacer} />
  </span>

  <span class="home-logo__sync-status">
    <span class="home-logo__sync-status__status">
      <Translation
        key={syncStatus.status === SyncStatus.Ok
          ? 'DATA_SYNCHRONIZATION_SUCCEEDED'
          : 'DATA_SYNCHRONIZATION_FAILED'}
      />
    </span>
    <span class="home-logo__sync-status__time">
      <Translation
        key="DATA_SYNCHRONIZATION_LAST"
        params={{
          time: lastSyncedAt
        }}
      />
    </span>
  </span>
</div>

<style lang="scss">
  .home-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    text-align: center;

    &__sync-status {
      display: flex;
      gap: 12px;
      opacity: 0.6;

      &__status {
        font-weight: 600;
      }

      &__time {
        font-weight: 400;
      }
    }

    &__description {
      font-weight: 600;
      font-size: 24px;

      :global(a.forum-link) {
        color: rgba(var(--color-yellow), 1);

        &:hover,
        &:focus {
          text-decoration-line: underline;
        }
      }
    }
  }
</style>
