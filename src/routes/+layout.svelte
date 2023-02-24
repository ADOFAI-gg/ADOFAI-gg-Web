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
  import '@fontsource/quicksand/variable.css';
  import '@fontsource/quicksand/index.css';
  import Nav from '@organisms/layout/Nav.svelte';
  import LoadingIndiciator from '@atoms/common/LoadingIndiciator.svelte';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import UpdateNotification from '@/components/utils/UpdateNotification.svelte';
  import { page } from '$app/stores';
  import { setupSentry } from '@/utils/sentry';
  import Footer from '@organisms/layout/Footer.svelte';

  onMount(() => {
    setupSentry();
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

<div class="page-container">
  <LoadingIndiciator />

  <Nav />
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
  .page-container {
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
