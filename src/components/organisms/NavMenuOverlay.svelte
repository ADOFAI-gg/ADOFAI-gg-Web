<script lang="ts">
  import NavSignArea from '../molecules/NavSignArea.svelte';
  import NavLinks from '../molecules/NavLinks.svelte';
  import { availableLanguages, currentLang } from '@/utils/i18n';

  let currentTab: 'lang' | null = null;

  const updateTab = (tab: typeof currentTab) => () => {
    currentTab = tab;
  };

  const updateLang = (code: string) => () => {
    $currentLang = code;
  };
</script>

<div class="w-[240px] p-4 flex flex-col gap-[8px]">
  {#if currentTab === 'lang'}
    <div
      class="p-2 rounded-md cursor-pointer hover:bg-white hover:bg-opacity-20 transition-all"
      on:click={updateTab(null)}
    >
      Back
    </div>
    {#each availableLanguages as lang}
      <div
        on:click={updateLang(lang.code)}
        class="p-2 rounded-md cursor-pointer hover:bg-white hover:bg-opacity-20 transition-all"
      >
        {lang.name}
      </div>
    {/each}
  {:else if !currentTab}
    <div
      on:click={updateTab('lang')}
      class="p-2 rounded-md cursor-pointer hover:bg-white hover:bg-opacity-20 transition-all"
    >
      Lang(Debug)
    </div>
    <div class="md:hidden flex flex-col gap-4">
      <NavLinks />
      {#if import.meta.env.VITE_USE_ACCOUNT}
        <div class="bg-white bg-opacity-20 w-full h-[1px]" />
        <NavSignArea />
      {/if}
    </div>
  {/if}
</div>
