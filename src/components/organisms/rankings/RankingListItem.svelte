<script lang="ts">
  import Icon from '@/components/atoms/Icon.svelte';
  import type { Ranking } from '@/types';

  export let item: Ranking & { rank: number };
</script>

<div
  class="border-t border-white/20 px-[16px] py-[14px] flex flex-col md:flex-row hover:bg-darkblue/20 transition-colors md:items-center"
>
  <div class="flex gap-[12px]">
    <div class="text-2xl font-medium leading-[24px] font-mono w-[56px]">#{item.rank}</div>
    <div class="font-medium text-xl leading-[24px]">{item.name}</div>
  </div>
  <div class="flex-grow" />
  <div class="flex gap-[24px] items-center mt-2 md:mt-0">
    <div class="flex gap-[6px]">
      <span>{item.totalPp.toFixed(1)}</span>
      <span class="opacity-60">PP</span>
    </div>
    <div class="h-[16px] flex-grow md:flex-grow-0 md:border-l md:border-white/40" />
    <a
      href={item.bestPlay.url}
      target="_blank"
      rel="noreferrer"
      class="flex items-center gap-[6px] opacity-80 hover:opacity-100 transition-opacity"
    >
      <Icon icon="playOutlined" size={16} />
      <div>Highest Play</div>
    </a>
  </div>
</div>
