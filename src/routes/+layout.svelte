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
  import { fade } from 'svelte/transition';
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
      await Promise.all([setupI18n(), loadTags()]);
      setupSentry();
      loaded.set(true);
    })();
  });
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

<div class={$loaded ? 'opacity-100 transition-opacity duration-1000' : 'invisible opacity-0'}>
  <LoadingIndiciator />

  {#if $i18nReady}
    <Nav />
  {/if}
  <div class="flex flex-col">
    <div class="flex-grow">
      <slot />
    </div>

    {#if !$page.data.meta?.hideFooter}
      <div class="mt-[64px]" />

      <Footer />
    {/if}
  </div>
</div>

{#if $loaded}
  <UpdateNotification />
{/if}
