<script lang="ts">
  import NavMenuItem from '@/components/atoms/nav/NavMenuItem.svelte';
  import NavMenuGroup from '@/components/molecules/nav/NavMenuGroup.svelte';
  import { availableLanguages, currentLang } from '@/utils/i18n';

  const updateLang = (code: string) => () => {
    $currentLang = code;
  };
</script>

<NavMenuGroup label="NAV_SETTINGS_LANGUAGES" backTab={null}>
  {#each availableLanguages as lang}
    <NavMenuItem on:click={updateLang(lang.code)} role="menuitem" tabindex="0">
      {lang.name}
    </NavMenuItem>
  {/each}
</NavMenuGroup>
