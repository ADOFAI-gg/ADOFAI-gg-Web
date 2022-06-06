<script lang="ts">
  import { browser, dev } from '$app/env';
  import { fly } from 'svelte/transition';
  import Icon from '../atoms/Icon.svelte';

  let hasUpdate = false;

  if (browser && !dev) {
    navigator.serviceWorker.getRegistration('/service-worker.js').then((registration) => {
      registration?.addEventListener('updatefound', () => {
        hasUpdate = true;

        setTimeout(() => {
          hasUpdate = false;
        }, 1000 * 10);
      });
      registration?.update();
    });
  }
</script>

{#if hasUpdate}
  <div
    in:fly={{
      duration: 1000,
      y: 200
    }}
    class="fixed gap-2 flex bottom-4 left-1/2 -translate-x-1/2 bg-blue p-2 rounded-full"
  >
    <div class="pl-2">Update available. Please reload to activate.</div>
    <div
      on:click={browser ? () => window.location.reload() : () => null}
      class="w-[24px] cursor-pointer h-[24px] rounded-full relative flex justify-center items-center bg-darkblue40"
    >
      <Icon icon="refresh" size={12} />
    </div>
  </div>
{/if}
