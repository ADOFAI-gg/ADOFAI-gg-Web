<script lang="ts">
  import NavSignArea from '@molecules/nav/NavSignArea.svelte';
  import NavLinks from '@molecules/nav/NavLinks.svelte';
  import { availableLanguages, currentLang } from '@/utils/i18n';

  let currentTab: 'lang' | null = null;

  const updateTab = (tab: typeof currentTab) => () => {
    currentTab = tab;
  };

  const updateLang = (code: string) => () => {
    $currentLang = code;
  };
</script>

<div class="menu">
  {#if currentTab === 'lang'}
    <div
      on:click={updateTab(null)}
      on:keydown={(e) => e.key === 'Enter' && updateTab(null)()}
      class="menuitem"
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
        class="menuitem"
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
      class="menuitem"
    >
      Lang(Debug)
    </div>

    <div class="for-mobile">
      <NavLinks />

      {#if import.meta.env.VITE_USE_ACCOUNT}
        <div class="division-line" />

        <NavSignArea />
      {/if}
    </div>
  {/if}
</div>

<style lang="scss">
  .menu {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 240px;
    padding: 16px;

    .menuitem {
      padding: 8px;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;

      &:hover,
      &:focus {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }

    .division-line {
      width: 100%;
      height: 1px;
      background-color: rgba(255, 255, 255, 0.2);
    }

    .for-mobile {
      display: flex;
      flex-direction: column;
      gap: 16px;

      @media (min-width: 768px) {
        display: none;
      }
    }
  }
</style>
