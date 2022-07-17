<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async ({ url }) => ({ props: { url } });

  const loaded = writable<boolean>(false);

  const defaultMeta = [
    {
      name: 'description',
      content: 'A website for viewing and downloading ADOFAI custom levels.'
    },
    {
      name: 'og:image',
      content: '/favicon.png'
    }
  ];
</script>

<script lang="ts">
  import '../stylesheets/main.scss';
  import '../stylesheets/font.scss';
  import Nav from '../components/organisms/Nav.svelte';
  import LoadingIndiciator from '@/components/atoms/LoadingIndiciator.svelte';
  import { i18nReady, setupI18n } from '@/utils/i18n';
  import LoadingSpinner from '@/components/atoms/LoadingSpinner.svelte';
  export let url: string;
  import { fade, fly } from 'svelte/transition';
  import { quadOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { loadTags } from '@/utils/tags';
  import UpdateNotification from '@/components/utils/UpdateNotification.svelte';
  import { page } from '$app/stores';
  import { setupSentry } from '@/utils/sentry';

  onMount(() => {
    (async () => {
      if ($loaded) return;
      await setupI18n();
      await loadTags();
      setupSentry();
      loaded.set(true);
    })();
  });

  let contentHeight = 0;
</script>

<svelte:head>
  <title>{$page.stuff.title || 'Adofai.gg'}</title>
  <link rel="apple-touch-icon" href="/images/icons/icon-512x512.png" />
  <meta name="theme-color" content="#ffffff" />
  {#each $page.stuff.metaTags ?? defaultMeta as meta}
    <meta {...meta} />
  {/each}
</svelte:head>

{#if !$loaded}
  <div
    out:fade={{ duration: 250, delay: 0 }}
    class="flex justify-center items-center fixed w-full h-full left-0 top-0"
  >
    <LoadingSpinner />
  </div>
{/if}

<div
  class={$loaded ? 'opacity-100 transition-all duration-1000' : 'invisible opacity-0'}
  style="height: {contentHeight}px"
>
  <LoadingIndiciator />

  {#if $i18nReady}
    <Nav />
  {/if}
  {#key url}
    <div
      bind:clientHeight={contentHeight}
      class="absolute w-full top-0 left-0"
      in:fly={{ x: 300, duration: 600, easing: quadOut }}
      out:fly={{ x: -300, duration: 600, easing: quadOut }}
    >
      <slot />
    </div>
  {/key}
</div>

{#if $loaded}
  <UpdateNotification />
{/if}
