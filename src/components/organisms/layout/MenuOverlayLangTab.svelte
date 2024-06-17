<script lang="ts">
  import NavMenuItem from '@/components/atoms/nav/NavMenuItem.svelte';
  import NavMenuGroup from '@/components/molecules/nav/NavMenuGroup.svelte';
  import { availableLanguages, getLangContext } from '@/utils/i18n';

  const currentLang = getLangContext();

  const updateLang = (code: string) => () => {
    $currentLang = code;
  };
</script>

<NavMenuGroup labelKey="nav:setting-language" backTab={null}>
  {#each availableLanguages as lang}
    <NavMenuItem
      on:click={updateLang(lang.code)}
      role="menuitem"
      tabindex="0"
      active={$currentLang === lang.code}
    >
      {lang.name}
    </NavMenuItem>
  {/each}
</NavMenuGroup>
