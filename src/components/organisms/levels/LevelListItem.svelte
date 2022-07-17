<script lang="ts">
  import DifficultyIcon from '@/components/atoms/DifficultyIcon.svelte';
  import type { Level } from '@/types';

  export let level: Level;
</script>

<a
  class="px-[16px] py-[12px] relative bg-darkblue gap-[12px] bg-opacity-0 hover:bg-opacity-20 transition-colors rounded-[8px] whitespace-nowrap flex h-[94px]"
  href="/levels/{level.id}"
>
  <div class="flex lg:items-center justify-center lg:justify-start flex-col lg:flex-row flex-grow">
    <div class="flex gap-[8px] flex-grow items-center">
      <div class="w-[60px] flex flex-col items-center gap-[2px]">
        <DifficultyIcon size={42} difficulty={level.difficulty} />
        <div class="text-md opacity-80">ID {level.id}</div>
      </div>
      <div class="flex-grow w-0 flex flex-col justify-between">
        <div class="text-2xl font-medium h-[24px] leading-[24px]">{level.title}</div>
        <div class="flex-grow w-full flex">
          <div class="flex h-[46px] items-center leading-[16px] gap-[4px] flex-grow w-0">
            <div class="flex flex-col gap-[4px] opacity-60 font-light">
              <div>Music By</div>
              <div>Level By</div>
            </div>
            <div class="flex flex-grow w-0 flex-col gap-[4px] opacity-80">
              <div class="overflow-hidden text-ellipsis">
                {level.artists.join(' & ')}
              </div>
              <div class="overflow-hidden text-ellipsis">
                {level.creators.join(' & ')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-full flex-grow lg:w-0 bg-red bg-opacity-40 self-end w-full" />
  </div>
</a>
