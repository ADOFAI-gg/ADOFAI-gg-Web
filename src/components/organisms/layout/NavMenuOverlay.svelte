<script lang="ts">
  import NavSignArea from '@molecules/nav/NavSignArea.svelte';
  import NavLinks from '@molecules/nav/NavLinks.svelte';
  import { availableLanguages, currentLang } from '@/utils/i18n';
  import Translation from '@/components/utils/Translation.svelte';
  import { fade } from 'svelte/transition';

  let currentTab: 'lang' | null = null;

  let height = 0;
  let width = 0;

  const updateTab = (tab: typeof currentTab) => () => {
    currentTab = tab;
  };

  const updateLang = (code: string) => () => {
    $currentLang = code;
  };
</script>

<div class="menu" style="--width: {width}px; --height: {height}px;">
  {#key currentTab}
    <div transition:fade class="menu-group" bind:clientWidth={width} bind:clientHeight={height}>
      {#if currentTab === 'lang'}
        <div
          on:click={updateTab(null)}
          on:keydown={(e) => e.key === 'Enter' && updateTab(null)()}
          class="menu-item"
          tabindex="0"
          role="menuitem"
        >
          Back
        </div>

        {#each availableLanguages as lang}
          <div
            on:click={updateLang(lang.code)}
            on:keydown={(e) => e.key === 'Enter' && updateLang(lang.code)()}
            role="menuitem"
            tabindex="0"
            class="menu-item"
          >
            {lang.name}
          </div>
        {/each}
      {:else if !currentTab}
        <div
          on:click={updateTab('lang')}
          on:keydown={(e) => e.key === 'Enter' && updateTab('lang')()}
          role="menuitem"
          tabindex="0"
          class="menu-item"
        >
          <Translation key="NAV_SETTINGS_LANGUAGES" />
        </div>

        <div class="menu:mobile">
          <NavLinks />

          {#if import.meta.env.VITE_USE_ACCOUNT}
            <div class="menu__divider" />

            <NavSignArea />
          {/if}
        </div>
      {/if}
    </div>
  {/key}
</div>

<style lang="scss">
  .menu {
    position: relative;
    overflow: hidden;
    width: var(--width);
    height: var(--height);
    transition: height ease 0.2s;

    &-group {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 240px;
      padding: 16px;
    }

    &-item {
      padding: 8px;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;

      &:hover,
      &:focus {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    &__divider {
      width: 100%;
      height: 1px;
      background-color: rgba(255, 255, 255, 0.2);
    }

    &\:mobile {
      display: flex;
      flex-direction: column;
      gap: 16px;

      @media (min-width: 768px) {
        display: none;
      }
    }
  }
</style>
