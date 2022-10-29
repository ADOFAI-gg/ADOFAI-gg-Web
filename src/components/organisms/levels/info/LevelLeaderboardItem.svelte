<script lang="ts">
  import Icon from '@atoms/asset/Icon.svelte';

  import LeaderboardStatItem from '@molecules/LeaderboardStatItem.svelte';
  import type { PlayLog } from '@/types';

  export let play: PlayLog;
  export let index: number;
</script>

<div
  class="px-[16px] py-[12px] flex items-center justify-between transition-colors bg-darkblue bg-opacity-0 hover:bg-opacity-20 focus:bg-opacity-20 border-b-[1px] border-b-white/20"
>
  <div class="flex gap-[14px] items-center">
    <div class="w-[56px] font-mono text-2xl text-center">#{index + 1}</div>
    <div class="flex gap-[8px] items-center">
      <!-- <div class="w-[24px] h-[24px] bg-white rounded-full" /> -->
      <div class="text-xl font-medium">{play.player.name}</div>
    </div>
  </div>
  <div class="flex gap-[12px] items-center">
    <div class="w-[128px]">
      <LeaderboardStatItem icon="fire" postfix="PP">
        {play.playPoint.toFixed(3)}
      </LeaderboardStatItem>
    </div>
    <div class="w-[96px]">
      <LeaderboardStatItem icon="accuracy" postfix="%">
        {Number(play.xAccuracy.toFixed(3))}
      </LeaderboardStatItem>
    </div>
    <div class="w-[84px]">
      <LeaderboardStatItem icon="speed" postfix="x">
        {play.speed / 100}
      </LeaderboardStatItem>
    </div>
    <div class="w-[1px] opacity-40 h-[16px] bg-white" />
    <a href={play.url} target="_blank" class="flex items-center gap-[6px]">
      <Icon icon="playOutlined" size={16} alt="Video Icon" />
      <span>Clear Video</span>
    </a>
  </div>
</div>
