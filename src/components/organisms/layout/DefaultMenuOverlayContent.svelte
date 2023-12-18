<script lang="ts">
  import NavMenuItem from '@/components/atoms/nav/NavMenuItem.svelte';
  import NavMenuItemLink from '@/components/atoms/nav/NavMenuItemLink.svelte';
  import NavMenuGroup from '@/components/molecules/nav/NavMenuGroup.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import { getNavCurrentTab } from './NavMenuOverlay.svelte';
  import { useAccount } from '@/utils/constants';

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
  <NavMenuItem
    on:click={() => ($currentTab = 'accessibility')}
    role="menuitem"
    tabindex="0"
    class="menu-item"
  >
    <Translation key="NAV_SETTINGS_ACCESSIBILITY" />
  </NavMenuItem>
</NavMenuGroup>

<NavMenuGroup label="NAV_LINKS">
  <NavMenuItemLink
    href="https://docs.google.com/forms/d/e/1FAIpQLScyHHUYzdFsL4HxhElhmj70_JNhTtfxiZM-KcbsYVBA_YfSvA/viewform?usp=send_form"
  >
    <Translation key="NAV_LINK_SUBMIT_PLAY" />
  </NavMenuItemLink>

  <NavMenuItemLink
    href="https://docs.google.com/forms/d/e/1FAIpQLSfhDCiKdZTkD_A6RFeei3eGZFdNTb8yClfBZgJ7um8veKV5aQ/viewform"
  >
    <Translation key="NAV_LINK_SUBMIT_LEVEL" />
  </NavMenuItemLink>

  <NavMenuItemLink
    href="https://docs.google.com/forms/d/e/1FAIpQLSff8C5U7_aXwwO56uvnZMvLoA6P3iY8YRAg2J2UVAusHOkM2Q/viewform?usp=sf_link"
  >
    <Translation key="NAV_LINK_RE_LEVEL" />
  </NavMenuItemLink>
</NavMenuGroup>

<div class="mobile-only">
  <NavMenuGroup label="NAV_PAGES">
    <NavMenuItemLink href="/levels">
      <Translation key="NAV_LEVELS" />
    </NavMenuItemLink>

    <NavMenuItemLink href="/rankings">
      <Translation key="NAV_RANKINGS" />
    </NavMenuItemLink>

    <NavMenuItemLink href="/references">
      <Translation key="NAV_REFERENCES" />
    </NavMenuItemLink>
  </NavMenuGroup>
</div>

{#if useAccount}
  <div class="menu__divider" />

  <!-- TODO -->
  <!-- <NavSignArea /> -->
{/if}
