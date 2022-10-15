<script lang="ts">
  import { api } from '@/api';

  import DifficultyIcon from '@/components/atoms/DifficultyIcon.svelte';
  import Image from '@/components/atoms/Image.svelte';
  import type { PlayLog } from '@/types';
  import { getYoutubeVideoId } from '@/utils/youtube';
  import TopPlayDetailPair from './TopPlayDetailPair.svelte';

  export let play: PlayLog;

  $: difficulty = (async () => {
    return api.get(`/api/v1/levels/${play.level.id}`).then((x) => x.data.difficulty);
  })();
</script>

<div
  class="
    group
    lg:first:mx-0 lg:last:ml-auto md:last:mr-0 last:md:col-span-2
    max-w-[360px] md:max-w-none lg:max-w-[360px] mx-auto
    last:lg:col-span-1 last:md:px-[25%] last:lg:p-0
    hover:bg-darkblue hover:bg-opacity-20 ease transition-all rounded-md
  "
>
  <a
    href={play.url}
    rel="noreferrer"
    target="_blank"
    class="flex flex-col gap-[15px] items-center group-hover:scale-95 ease transition-all"
  >
    <div class="w-full aspect-video bg-repeat-round rounded-[5px] overflow-hidden">
      <Image
        width="100%"
        height="100%"
        alt="Youtube Video Thumbnail"
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
      <div class="flex gap-[24px]">
        <TopPlayDetailPair icon="accuracy" value="{play.xAccuracy}%" />
        <TopPlayDetailPair
          icon="speed"
          value="{(play.speed / 100).toLocaleString('en', { minimumFractionDigits: 1 })}X"
        />
        <TopPlayDetailPair icon="fire" value="{play.playPoint.toFixed(0)} PP" />
      </div>
    </div>
  </a>
</div>
