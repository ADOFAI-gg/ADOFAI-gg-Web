<script lang="ts">
  import DifficultyIcon from '@atoms/asset/DifficultyIcon.svelte';
  import Icon from '@atoms/asset/Icon.svelte';
  import type { Level } from '@/types';
  import LevelListItemTagList from '@organisms/levels/list/LevelListItemTagList.svelte';

  export let level: Level;
</script>

<a
  class="px-[16px] py-[18px] group relative bg-darkblue gap-[16px] bg-opacity-0 hover:bg-opacity-20 transition-colors border-b-white/20 border-b-[1px] whitespace-nowrap flex"
  href="/levels/{level.id}"
>
  <div
    class="flex lg:items-center justify-center lg:justify-start w-0 flex-col lg:flex-row flex-grow"
  >
    <div class="flex gap-[8px] flex-grow items-center">
      <div class="w-[60px] flex flex-col items-center gap-[2px]">
        <DifficultyIcon size={42} difficulty={level.difficulty} />
        <div class="text-md opacity-80">ID {level.id}</div>
      </div>
      <div class="flex-grow w-0 flex flex-col justify-between">
        <div class="text-2xl font-medium h-[24px] leading-[24px] overflow-x-clip text-ellipsis">
          {level.title}
        </div>
        <div class="flex-grow w-full flex">
          <div class="flex h-[46px] items-center leading-[16px] gap-[4px] flex-grow w-0">
            <div class="flex flex-col gap-[4px] opacity-60 font-light">
              <div>Music By</div>
              <div>Level By</div>
            </div>
            <div class="flex flex-grow w-0 flex-col gap-[4px] opacity-80">
              <div class="relative h-[16px]">
                <div class="absolute overflow-x-hidden h-[24px] text-ellipsis w-full">
                  {level.music.artists.map((x) => x.name).join(' & ')}
                </div>
              </div>
              <div class="relative h-[16px]">
                <div class="absolute overflow-x-hidden h-[24px] text-ellipsis w-full">
                  {level.creators.map((x) => x.name).join(' & ')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {#if import.meta.env.VITE_USE_ACCOUNT || level.tags.length}
      <div
        class="self-end w-full lg:w-2/5 flex lg:justify-end justify-start mt-2 lg:mt-0 lg:py-[11px]"
      >
        <LevelListItemTagList {level} />

        {#if import.meta.env.VITE_USE_ACCOUNT}
          <div class="ml-[12px] flex gap-[12px]">
            <div class="w-[2px] rounded-full h-full bg-[#E8E8E8] bg-opacity-40" />
            <div class="flex gap-[6px] items-center">
              <Icon icon="heartOutlined" size={20} alt="Heart Icon" />
              <div class="font-medium text-lg">1.4K</div>
            </div>
          </div>
        {/if}
      </div>
    {/if}
  </div>
  <div
    class="self-center w-0 opacity-0 group-focus:opacity-100 group-hover:opacity-100 transition-all group-focus:w-[48px] group-hover:w-[48px] relative duration-200"
  >
    <a
      href={level.download}
      class="absolute right-0 top-0 -translate-y-1/2"
      rel="noreferrer"
      target="_blank"
    >
      <Icon icon="downloadFile" size={48} alt="Download Icon" />
    </a>
  </div>
</a>
