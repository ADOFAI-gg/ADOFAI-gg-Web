<script context="module" lang="ts">
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
  import '@/stylesheets/main.scss';
  import '@/stylesheets/font.scss';
  import Nav from '@organisms/layout/Nav.svelte';
  import LoadingIndiciator from '@atoms/common/LoadingIndiciator.svelte';
  import { i18nReady, setupI18n } from '@/utils/i18n';
  import LoadingSpinner from '@atoms/common/LoadingSpinner.svelte';
  export let url: string;
  import { fade, fly } from 'svelte/transition';
  import { quadOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { loadTags } from '@/utils/tags';
  import UpdateNotification from '@/components/utils/UpdateNotification.svelte';
  import { page } from '$app/stores';
  import { setupSentry } from '@/utils/sentry';
  import Footer from '@organisms/layout/Footer.svelte';

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
  let contentWidth = 0;
</script>

<svelte:head>
  <title>{$page.data.meta?.title || 'ADOFAI.gg'}</title>
  <link rel="apple-touch-icon" href="/images/icons/icon-512x512.png" />
  <meta name="theme-color" content="#ffffff" />
  {#each $page.data.meta?.metaTags ?? defaultMeta as meta}
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
  class={$loaded ? 'opacity-100 transition-opacity duration-1000' : 'invisible opacity-0'}
  style="height: {contentHeight}px; width: {contentWidth}px"
>
  <LoadingIndiciator />

  {#if $i18nReady}
    <Nav />
  {/if}
  {#key url}
    <div
      bind:clientHeight={contentHeight}
      bind:clientWidth={contentWidth}
      class="absolute min-w-[100vw] top-0 left-0 min-h-screen flex flex-col"
      in:fade={{ duration: 300, easing: quadOut }}
      out:fade={{ duration: 300, easing: quadOut }}
    >
      <div class="flex-grow">
        <slot />
      </div>

      {#if !$page.data.meta?.hideFooter}
        <div class="mt-[64px]" />

        <Footer />
      {/if}
    </div>
  {/key}
</div>

{#if $loaded}
  <UpdateNotification />
{/if}
