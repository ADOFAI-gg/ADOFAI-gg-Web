<script lang="ts">
  import Image from '../components/atoms/Image.svelte';
  import { page } from '$app/stores';
  import { Asset } from '@/utils/assets';

  $: data = (() => {
    switch ($page.status) {
      case 404:
        return {
          description: 'This page does not exist or expired.',
          image: {
            url: Asset.url('images/404.svg'),
            alt: '404 Image'
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

<div class="flex flex-col h-screen max-w-[1100px] p-4 mx-auto">
  <div class="h-nav" />

  <div
    class="flex-grow bg-white rounded-xl flex flex-col justify-center gap-[15px] items-center text-black"
  >
    {#if data.image}
      <Image src={data.image.url} alt={data.image.alt} />
    {/if}

    <div class="text-4xl font-bold">{data.title}</div>
    <div class="text-3xl">{data.description}</div>
  </div>
</div>
