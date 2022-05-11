<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import NotFound from '../assets/images/404.svg?url';

  export const load: Load = ({ error, status }) => {
    switch (status) {
      case 404:
        return {
          props: {
            title: 'Error 404',
            description: 'This page does not exist or expired.',
            image: NotFound
          }
        };
    }

    return {
      props: { title: 'Unknown Error', description: 'An unknown error occurred.', image: null }
    };
  };
</script>

<script lang="ts">
  import Image from '../components/atoms/Image.svelte';

  export let title: string;

  export let description: string;

  export let image: string;
</script>

<div class="flex flex-col h-screen max-w-[1300px] p-4 mx-auto">
  <div class="h-nav" />

  <div
    class="flex-grow bg-white rounded-xl flex flex-col justify-center gap-[15px] items-center text-black"
  >
    <Image src={image} width="228.35" height="255" />
    <div class="text-4xl font-bold">{title}</div>
    <div class="text-3xl">{description}</div>
  </div>
</div>
