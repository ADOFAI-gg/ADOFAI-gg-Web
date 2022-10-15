<script lang="ts" context="module">
  const highlightedTags: (string | number)[] = [4];
  const excludedTags: number[] = [11, 1];
</script>

<script lang="ts">
  import Icon from '@/components/atoms/Icon.svelte';
  import Tooltip from '@/components/atoms/Tooltip.svelte';

  import TooltippedTagIcon from '@/components/molecules/TooltippedTagIcon.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import type { Level } from '@/types';

  export let level: Level;

  $: normalTags = level.tags.filter(
    (x) => !highlightedTags.includes(x.id) && !excludedTags.includes(x.id)
  );

  $: highlighted = (() => {
    const result = level.tags.map((x) => x.id).filter((x) => highlightedTags.includes(x)) as (
      | string
      | number
    )[];

    if (level.epilepsyWarning) {
      result.push('SW');
    }

    return result;
  })();
</script>

<div class="flex flex-col gap-[12px]">
  {#if highlighted.length}
    <div class="flex flex-col gap-[6px]">
      {#each highlighted as tag (tag)}
        <Tooltip placement="bottom-start">
          <div slot="button" class="flex text-lg font-medium gap-[6px] text-red items-center">
            <Icon namespace="tagIcons" icon={`${tag}`} class="text-red" alt="Tag Icon" />
            <div>
              <Translation key="TAG_{tag}_NAME" />
            </div>
          </div>
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
    </div>
    <div class="h-[1px] w-[120px] bg-white bg-opacity-40" />
  {/if}
  <div class="flex gap-[6px] flex-wrap">
    {#each normalTags as tag (tag.id)}
      <TooltippedTagIcon tag={tag.id} />
    {/each}
  </div>
</div>
