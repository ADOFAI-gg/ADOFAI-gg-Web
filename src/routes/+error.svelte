<script lang="ts">
  import Image from '@atoms/asset/Image.svelte';
  import notfoundImage from '@/assets/images/404.svg';
  import { page } from '$app/stores';

  $: data = (() => {
    switch ($page.status) {
      case 404:
        return {
          description: 'This page does not exist or expired.',
          image: {
            url: notfoundImage,
            alt: 'A very perplexed person, scratching their head'
          },
          title: 'Error 404'
        };
    }

    return {
      description: $page.error?.message || 'An unknown error occurred.',
      image: null,
      title: `${$page.error?.message || 'Unknown Error'} - ${
        $page.error?.message || 'An unknown error occurred.'
      }`
    };
  })();
</script>

<div class="error-container">
  <div class="nav-spacer" />

  <div class="error-content">
    {#if data.image}
      <Image src={data.image.url} alt={data.image.alt} />
    {/if}

    <div class="error-title">{data.title}</div>
    <div class="error-description">{data.description}</div>
  </div>
</div>

<style lang="scss">
  .error-container {
    display: flex;
    flex-direction: column;
    max-width: 1100px;
    height: 100vh;
    margin: 0 auto;
    padding: 16px;
  }

  .nav-spacer {
    height: var(--nav-height);
  }

  .error-content {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    gap: 15px;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background-color: white;
    color: black;
  }

  .error-title {
    font-weight: 700;
    font-size: 36px;
  }

  .error-description {
    font-size: 28px;
  }
</style>
