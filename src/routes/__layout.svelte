<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async ({ url }) => ({ props: { url } });

  const loaded = writable<boolean>(false);
</script>

<script lang="ts">
  import '../stylesheets/main.scss';
  import Nav from '../components/organisms/Nav.svelte';
  import LoadingIndiciator from '@/components/atoms/LoadingIndiciator.svelte';
  import { setupI18n } from '@/utils/i18n';
  import LoadingSpinner from '@/components/atoms/LoadingSpinner.svelte';
  export let url: string;
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { loadTags } from '@/utils/tags';
  import UpdateNotification from '@/components/utils/UpdateNotification.svelte';

  onMount(() => {
    (async () => {
      if ($loaded) return;
      await setupI18n();
      await loadTags();
      loaded.set(true);
    })();
  });
</script>

{#if !$loaded}
  <div
    out:fade={{ duration: 250, delay: 0 }}
    class="flex justify-center items-center fixed w-full h-full left-0 top-0"
  >
    <LoadingSpinner />
  </div>
{/if}
<div class={$loaded ? 'opacity-100 transition-all duration-1000' : 'invisible opacity-0'}>
  <LoadingIndiciator />

  <Nav />
  {#key url}
    <div>
      <slot />
    </div>
  {/key}
</div>

{#if $loaded}
  <UpdateNotification />
{/if}
