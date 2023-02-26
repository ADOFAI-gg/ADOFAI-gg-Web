<script lang="ts">
  import NavMenuItem from '@/components/atoms/nav/NavMenuItem.svelte';
  import NavMenuGroup from '@/components/molecules/nav/NavMenuGroup.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import { getNavCurrentTab } from './NavMenuOverlay.svelte';

  const currentTab = getNavCurrentTab();
</script>

<NavMenuGroup label="NAV_SETTINGS">
  <NavMenuItem
    on:click={() => ($currentTab = 'lang')}
    role="menuitem"
    tabindex="0"
    class="menu-item"
  >
    <Translation key="NAV_SETTINGS_LANGUAGES_BUTTON" />
  </NavMenuItem>
</NavMenuGroup>

{#if import.meta.env.VITE_USE_ACCOUNT}
  <div class="menu__divider" />

  <!-- TODO -->
  <!-- <NavSignArea /> -->
{/if}
