<script lang="ts">
  import LevelHeaderLinksArea from '@/components/molecules/levels/LevelHeaderLinksArea.svelte';
  import type { Level } from '@/types';

  export let level: Level;

  const youtubeIdRegex = /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/;

  $: youtubeId = youtubeIdRegex.exec(level.video)?.[1] ?? '';
</script>

<div class="w-full px-8 relative">
  <div
    class="absolute left-0 bg-center bg-no-repeat bg-cover brightness-[60%] -z-10 top-0 w-full h-full"
    style="background-image: url(https://i.ytimg.com/vi/{youtubeId}/original.jpg)"
  />
  <div class="h-nav" />
  <div class="max-w-[1300px] w-full mx-auto">
    <div class="mt-[40px] text-4xl font-bold">{level.title}</div>
    <div class="px-[26px] py-[20px] rounded-t-[26px] bg-darkblue40 flex gap-4 mt-[24px]">
      <div class="flex-grow" />
      <LevelHeaderLinksArea {level} />
    </div>
  </div>
</div>
