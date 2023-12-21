<script lang="ts">
  import { browser, dev } from '$app/environment';
  import { fly } from 'svelte/transition';
  import Icon from '@atoms/asset/Icon.svelte';
  import Translation from './Translation.svelte';

  let hasUpdate = false;

  if (browser && !dev) {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .getRegistration('/service-worker.js')
        .then((registration) => {
          registration?.addEventListener('updatefound', () => {
            hasUpdate = true;
          });
          registration?.update();
        })
        .catch(() => {
          console.warn('Cannot retrieve update');
        });
    }
  }
</script>

{#if hasUpdate}
  <div
    transition:fly={{
      duration: 1000,
      y: 60
    }}
    class="update-notification"
  >
    <div class="update-available-text">
      <Translation key="common:update-available" />
    </div>
    <button on:click={browser ? () => window.location.reload() : () => null} class="refresh-button">
      <Icon icon="refresh" size={12} alt="Refresh Icon" />
    </button>
  </div>
{/if}

<style lang="scss">
  .update-notification {
    position: fixed;
    bottom: 16px;
    left: 50%;
    display: flex;
    gap: 8px;
    padding: 8px;
    border-radius: 999px;
    background-color: rgba(var(--color-blue), 1);
    white-space: nowrap;
    transform: translateX(-50%);
  }

  .update-available-text {
    padding-left: 8px;
  }

  .refresh-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 999px;
    background-color: rgba(var(--color-darkblue), 0.4);
    cursor: pointer;
  }
</style>
