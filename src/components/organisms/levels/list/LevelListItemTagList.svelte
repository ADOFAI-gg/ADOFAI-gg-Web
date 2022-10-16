<script context="module" lang="ts">
  const maxCount = writable(0);

  if (typeof window !== 'undefined') {
    const calc = () => {
      const windowWidth = Math.max(window.innerWidth, 1100);
      const contentWidth =
        windowWidth >= 1024 ? (windowWidth - 32) * (2 / 5) * (2 / 3) : windowWidth - 32;

      maxCount.set(Math.min(Math.floor(contentWidth / 28), 10));
    };
    window.addEventListener('resize', () => {
      calc();
    });

    calc();
  }
</script>

<script lang="ts">
  import Icon from '@atoms/asset/Icon.svelte';
  import Tooltip from '@atoms/common/Tooltip.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import type { Level } from '@/types';
  import { writable } from 'svelte/store';

  export let level: Level;

  $: tags = level.tags.map((x) => x.id);
  $: remaining = Math.max(0, tags.length - $maxCount);
</script>

<div class="w-fit">
  <div class="flex gap-[4px] justify-end">
    {#each tags.filter((x) => x !== 4).slice(0, $maxCount) as tag (tag)}
      <Tooltip placement="bottom-end">
        <Icon icon={`${tag}`} namespace="tagIcons" size={24} slot="button" alt="Tag Icon" />
        <div class="p-[12px] text-md">
          <div class="font-bold">
            <Translation key="TAG_{tag}_NAME" />
          </div>
          <div class="font-regular">
            <Translation key="TAG_{tag}_DESCRIPTION" />
          </div>
        </div>
      </Tooltip>
    {/each}

    {#if tags.includes(4)}
      <Tooltip placement="bottom-end">
        <Icon
          icon="4"
          namespace="tagIcons"
          class="text-red"
          size={24}
          slot="button"
          alt="Tag Icon"
        />
        <div class="p-[12px] text-md">
          <div class="font-bold">
            <Translation key="TAG_4_NAME" />
          </div>
          <div class="font-regular">
            <Translation key="TAG_4_DESCRIPTION" />
          </div>
        </div>
      </Tooltip>
    {/if}

    {#if level.epilepsyWarning}
      <Tooltip placement="bottom-end">
        <Icon
          icon="SW"
          namespace="tagIcons"
          class="text-red"
          size={24}
          slot="button"
          alt="Tag Icon"
        />
        <div class="p-[12px] text-md">
          <div class="font-bold">
            <Translation key="TAG_SW_NAME" />
          </div>
          <div class="font-regular">
            <Translation key="TAG_SW_DESCRIPTION" />
          </div>
        </div>
      </Tooltip>
    {/if}

    {#if remaining}
      <div class="text-lg bg-white bg-opacity-20 rounded-full px-[8px] py-[4px] leading-[16px]">
        +{remaining}
      </div>
    {/if}
  </div>
</div>
