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
  <div out:fade={{ duration: 250, delay: 0 }} class="root-loader">
    <LoadingSpinner />
  </div>
{/if}

<div class="page-container" class:active={!!$loaded}>
  <LoadingIndiciator />

  {#if $i18nReady}
    <Nav />
  {/if}
  <div class="page-layout">
    <div class="page-content">
      <slot />
    </div>

    {#if !$page.data.meta?.hideFooter}
      <div class="footer-spacer" />

      <Footer />
    {/if}
  </div>
</div>

{#if $loaded}
  <UpdateNotification />
{/if}

<style lang="scss">
  .root-loader {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .page-container {
    opacity: 0;
    visibility: hidden;

    &.active {
      opacity: 1;
      visibility: visible;
      transition: opacity cubic-bezier(0.4, 0, 0.2, 1) 1s;
    }

    > .page-layout {
      display: flex;
      flex-direction: column;
      min-height: 100vh;

      > .page-content {
        flex-grow: 1;
      }

      > .footer-spacer {
        margin-top: 64px;
      }
    }
  }
</style>
