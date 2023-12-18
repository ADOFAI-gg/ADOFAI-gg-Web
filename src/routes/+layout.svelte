<script context="module" lang="ts">
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
  import '@/stylesheets/layout.scss';
  import '@/stylesheets/font.scss';
  import Nav from '@organisms/layout/Nav.svelte';
  import LoadingIndiciator from '@atoms/common/LoadingIndiciator.svelte';
  import { onMount } from 'svelte';
  import UpdateNotification from '@/components/utils/UpdateNotification.svelte';
  import { page } from '$app/stores';
  import Footer from '@organisms/layout/Footer.svelte';
  import { partytownSnippet } from '@builder.io/partytown/integration';

  // quicksand
  import '@fontsource/quicksand/300.css';
  import '@fontsource/quicksand/400.css';
  import '@fontsource/quicksand/500.css';
  import '@fontsource/quicksand/600.css';
  import '@fontsource/quicksand/700.css';

  // M Plus Rounded 1c
  import '@fontsource/m-plus-rounded-1c/japanese-300.css';
  import '@fontsource/m-plus-rounded-1c/japanese-400.css';
  import '@fontsource/m-plus-rounded-1c/japanese-500.css';
  import '@fontsource/m-plus-rounded-1c/japanese-700.css';
  // Roboto Mono
  import '@fontsource/roboto-mono/300.css';
  import '@fontsource/roboto-mono/500.css';
  import { PUBLIC_GA_ID, PUBLIC_GTM_ID } from '$env/static/public';
  import IconProvider from '@/components/utils/IconProvider.svelte';

  let partytownScriptEl: HTMLScriptElement;

  const getGtagContent = () => {
    const scriptTagName = 'script';

    let content = `<${scriptTagName} type="text/partytown">`;

    content += `
    window.dataLayer = window.dataLayer || [];

    window.gtag = function gtag() {
      dataLayer.push(arguments);
    };

    gtag('js', new Date());
    `;

    if (PUBLIC_GA_ID) {
      content += `
      gtag('config', ${JSON.stringify(PUBLIC_GA_ID)}, {
        page_location: window.location.href,
        page_path: window.location.pathname
      });
      `;
    }
    content += `</${scriptTagName}>`;

    return content;
  };

  const gtagContent = getGtagContent();

  onMount(() => {
    if (partytownScriptEl) {
      partytownScriptEl.textContent = partytownSnippet();
    }
  });
</script>

<svelte:head>
  <title>{$page.data?.meta?.title || 'ADOFAI.gg'}</title>
  <link rel="apple-touch-icon" href="/images/icons/maskable_icon_x512.png" />
  <meta name="theme-color" content="#262339" />
  {#each $page.data?.meta?.metaTags ?? defaultMeta as meta}
    <meta {...meta} />
  {/each}

  <script>
    partytown = {
      forward: ['dataLayer.push', 'gtag']
    };
  </script>
  <script bind:this={partytownScriptEl}></script>

  {#if PUBLIC_GTM_ID}
    <script
      type="text/partytown"
      src="https://www.googletagmanager.com/gtag/js?id={PUBLIC_GTM_ID}"
    ></script>

    <!-- eslint-disable-next-line svelte/no-at-html-tags-->
    {@html gtagContent}
  {/if}
</svelte:head>

<Nav />

<LoadingIndiciator />

<div>
  <div class="page-layout">
    <div class="page-content">
      <slot />
    </div>

    {#if !$page.data?.meta?.hideFooter}
      <div class="footer-spacer" />

      <Footer />
    {/if}
  </div>
</div>

<UpdateNotification />
<IconProvider />

<style lang="scss">
  .page-layout {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - var(--nav-height));
  }

  .page-content {
    flex-grow: 1;
  }

  .footer-spacer {
    margin-top: 64px;
  }
</style>
