<script lang="ts" context="module">
  import { Asset } from '@/utils/assets';

  import type { Load } from '@sveltejs/kit';

  export const load: Load = ({ error, status }) => {
    switch (status) {
      case 404:
        return {
          props: {
            title: 'Error 404',
            description: 'This page does not exist or expired.',
            image: Asset.url('images/404.svg')
          }
        };
    }

    return {
      props: {
        title: error?.message || 'Unknown Error',
        description: error?.message || 'An unknown error occurred.',
        image: null
      }
    };
  };
</script>

<script lang="ts">
  import Image from '../components/atoms/Image.svelte';

  export let title: string;

  export let description: string;

  export let image: string;
</script>

<svelte:head>
  <title>{title} - {description}</title>
</svelte:head>

<div class="flex flex-col h-screen max-w-[1100px] p-4 mx-auto">
  <div class="h-nav" />

  <div
    class="flex-grow bg-white rounded-xl flex flex-col justify-center gap-[15px] items-center text-black"
  >
    <Image src={image} />
    <div class="text-4xl font-bold">{title}</div>
    <div class="text-3xl">{description}</div>
  </div>
</div>
