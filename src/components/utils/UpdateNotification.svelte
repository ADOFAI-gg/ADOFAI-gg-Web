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
    class="fixed gap-2 flex bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-blue p-2 rounded-full"
  >
    <div class="pl-2">
      <Translation key="UPDATE_AVAILABLE" />
    </div>
    <div
      on:click={browser ? () => window.location.reload() : () => null}
      class="w-[24px] cursor-pointer h-[24px] rounded-full relative flex justify-center items-center bg-darkblue40"
    >
      <Icon icon="refresh" size={12} alt="Refresh Icon" />
    </div>
  </div>
{/if}
