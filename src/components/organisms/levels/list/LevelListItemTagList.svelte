<script context="module" lang="ts">
  const maxCount = writable(8);

  if (typeof window !== 'undefined') {
    const calc = () => {
      const windowWidth = Math.max(window.innerWidth, 1100);
      const contentWidth =
        windowWidth >= 1024 ? (windowWidth - 32) * (2 / 5) * (2 / 3) : windowWidth - 32;

      maxCount.set(Math.min(Math.floor(contentWidth / 30), 10));
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

<div style="width: fit-content;">
  <div class="tag-list">
    {#each tags.filter((x) => x !== 4).slice(0, $maxCount) as tag (tag)}
      <Tooltip placement="bottom-end">
        <Icon icon={`${tag}`} namespace="tagIcons" size={24} slot="button" alt="Tag Icon" />

        <div class="tooltip">
          <div class="tooltip__title">
            <Translation key="tags:tag-{tag}-name" />
          </div>
          <Translation key="tags:tag-{tag}-description" />
        </div>
      </Tooltip>
    {/each}

    {#if tags.includes(4)}
      <Tooltip placement="bottom-end">
        <Icon
          icon="4"
          namespace="tagIcons"
          style="color: rgba(var(--color-red), 100);"
          size={24}
          slot="button"
          alt="Tag Icon"
        />

        <div class="tooltip">
          <div class="title">
            <Translation key="tags:tag-4-name" />
          </div>
          <Translation key="tags:tag-4-description" />
        </div>
      </Tooltip>
    {/if}

    {#if level.epilepsyWarning}
      <Tooltip placement="bottom-end">
        <Icon
          icon="SW"
          namespace="tagIcons"
          style="color: rgba(var(--color-red), 100);"
          size={24}
          slot="button"
          alt="Tag Icon"
        />

        <div class="tooltip">
          <div class="title">
            <Translation key="tags:tag-sw-name" />
          </div>
          <Translation key="tags:tag-sw-description" />
        </div>
      </Tooltip>
    {/if}

    {#if remaining}
      <div class="remaining">
        +{remaining}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .tag-list {
    display: flex;
    gap: 6px;

    @media (min-width: 768px) {
      justify-content: flex-end;
    }
  }

  .remaining {
    padding: 4px 8px;
    border-radius: 100em;
    background-color: rgba(255, 255, 255, 0.2);
    font-size: 16px;
    line-height: 16px;
  }

  .tooltip {
    padding: 12px;
    font-weight: 400;
    font-size: 14px;

    &__title {
      font-weight: 700;
    }
  }
</style>
