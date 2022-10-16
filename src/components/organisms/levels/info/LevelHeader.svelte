<script lang="ts">
  import LevelHeaderLinksArea from '@molecules/levels/LevelHeaderLinksArea.svelte';
  import type { Level } from '@/types';
  import { getYoutubeVideoId } from '@/utils/youtube';
  import HorizontalUserList from '@organisms/user/HorizontalUserList.svelte';

  export let level: Level;

  $: youtubeId = getYoutubeVideoId(level.video);
</script>

<div class="w-full px-8 relative">
  <div
    class="absolute left-0 bg-center bg-no-repeat bg-cover brightness-[60%] -z-10 top-0 w-full h-full"
    style="background-image: url(https://i.ytimg.com/vi/{youtubeId}/original.jpg)"
  />
  <div class="absolute left-0 backdrop-blur -z-10 top-0 w-full h-full" />

  <div class="h-nav" />
  <div class="max-w-[1100px] w-full mx-auto">
    <div class="mt-[40px] text-4xl font-bold text-shadow-5 min-h-[140px] flex items-end">
      {level.title}
    </div>
    <div
      class="px-[26px] py-[20px] rounded-t-[26px] bg-darkblue40 flex gap-4 mt-[24px] flex-col md:flex-row"
    >
      <div class="md:w-0 flex-grow">
        <HorizontalUserList
          allTitle="Creator"
          label="LEVEL_DETAIL_LEVEL_BY"
          users={level.creators}
        />
        <HorizontalUserList
          allTitle="Artist"
          label="LEVEL_DETAIL_MUSIC_BY"
          users={level.music.artists}
        />
      </div>
      <LevelHeaderLinksArea {level} />
    </div>
  </div>
</div>