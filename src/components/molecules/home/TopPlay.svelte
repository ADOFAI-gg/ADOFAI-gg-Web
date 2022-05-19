<script lang="ts">
  import { api } from '@/api';

  import DifficultyIcon from '@/components/atoms/DifficultyIcon.svelte';
  import Image from '@/components/atoms/Image.svelte';
  import type { PlayLog } from '@/types';
  import { getYoutubeVideoId } from '@/utils/youtube';

  export let play: PlayLog;

  $: difficulty = (async () => {
    return api.get(`/api/v1/levels/${play.level.id}`).then((x) => x.data.difficulty);
  })();
</script>

<div
  class="flex flex-col gap-[15px] items-center last:md:col-span-2 last:md:px-[25%] last:lg:p-0 last:lg:col-span-1"
>
  <div class="w-full aspect-video bg-repeat-round rounded-[5px] overflow-hidden">
    <Image
      width="100%"
      height="100%"
      src="https://i.ytimg.com/vi/{getYoutubeVideoId(play.url)}/original.jpg"
    />
  </div>
  <div class="flex flex-col gap-[4px] w-full items-center">
    <div class="text-2xl font-bold">
      {play.player.name}
    </div>
    <div class="flex gap-[8px] items-center">
      {#await difficulty then difficulty}
        <DifficultyIcon {difficulty} />
      {/await}
      <div class="font-medium">{play.level.name}</div>
    </div>
  </div>
</div>
