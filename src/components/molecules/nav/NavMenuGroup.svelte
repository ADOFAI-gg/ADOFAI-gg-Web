<script lang="ts">
  import Icon from '@/components/atoms/asset/Icon.svelte';
  import {
    getNavCurrentTab,
    type NavMenuTabType
  } from '@/components/organisms/layout/NavMenuOverlay.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import type { TranslationKey } from '@/utils/i18n';

  export let labelKey: TranslationKey;

  export let backTab: NavMenuTabType | undefined = undefined;

  const currentTab = getNavCurrentTab();
</script>

<div class="group">
  <div class="group-label">
    {#if backTab !== undefined}
      <button
        on:click={() => {
          if (backTab === undefined) return;
          currentTab.set(backTab);
        }}
      >
        <Icon icon="chevronLeft" alt="back" size={18} />
      </button>
    {/if}
    <Translation key={labelKey} />
  </div>
  <div class="group-content">
    <slot />
  </div>
</div>

<style lang="scss">
  .group {
    &-label {
      display: flex;
      padding-bottom: 8px;
      padding-left: 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      font-weight: 700;
      font-size: 14px;
    }

    &-content {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 6px;
    }
  }
</style>
