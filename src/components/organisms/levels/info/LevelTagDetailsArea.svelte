<script lang="ts" context="module">
  const highlightedTags: (string | number)[] = [4];
  const excludedTags: number[] = [11, 1];
</script>

<script lang="ts">
  import Icon from '@atoms/asset/Icon.svelte';
  import Tooltip from '@atoms/common/Tooltip.svelte';

  import TooltippedTagIcon from '@/components/molecules/levels/TooltippedTagIcon.svelte';
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

<div class="tags">
  {#if highlighted.length}
    <div class="tags__highlighted">
      {#each highlighted as tag (tag)}
        <Tooltip placement="bottom-start">
          <div slot="button" class="tags__highlighted-tag">
            <Icon
              namespace="tagIcons"
              icon={`${tag}`}
              style="color: rgba(var(--color-red), 1);"
              alt="Tag Icon"
            />

            <div>
              <Translation key="TAG_{tag}_NAME" />
            </div>
          </div>

          <div class="tooltip">
            <div style="font-weight: 700;">
              <Translation key="TAG_{tag}_NAME" />
            </div>

            <div>
              <Translation key="TAG_{tag}_DESCRIPTION" />
            </div>
          </div>
        </Tooltip>
      {/each}
    </div>

    <div class="tags__divider" />
  {/if}

  <div class="tags__content">
    {#each normalTags as tag (tag.id)}
      <TooltippedTagIcon tag={tag.id} />
    {/each}
  </div>
</div>

<style lang="scss">
  .tags {
    display: flex;
    flex-direction: column;
    gap: 12px;

    &__highlighted {
      display: flex;
      flex-direction: column;
      gap: 6px;
      align-items: flex-start;

      &-tag {
        display: flex;
        gap: 6px;
        align-items: center;
        color: rgba(var(--color-red), 1);
        font-weight: 500;
        font-size: 16px;
      }
    }

    &__content {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    &__divider {
      width: 120px;
      height: 1px;
      background-color: rgba(255, 255, 255, 0.4);
    }
  }

  .tooltip {
    padding: 12px;
    font-weight: 400;
    font-size: 14px;
  }
</style>
