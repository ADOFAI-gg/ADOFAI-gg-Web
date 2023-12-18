<script lang="ts">
  import NavMenuItem from '@/components/atoms/nav/NavMenuItem.svelte';
  import NavMenuItemLink from '@/components/atoms/nav/NavMenuItemLink.svelte';
  import NavMenuGroup from '@/components/molecules/nav/NavMenuGroup.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import { getNavCurrentTab } from './NavMenuOverlay.svelte';
  import { useAccount } from '@/utils/constants';
  import NavSignArea from '@/components/molecules/nav/NavSignArea.svelte';

  const currentTab = getNavCurrentTab();
</script>

<NavMenuGroup labelKey="nav:group-settings">
  <NavMenuItem
    on:click={() => ($currentTab = 'lang')}
    role="menuitem"
    tabindex="0"
    class="menu-item"
  >
    <Translation key="nav:setting-language-international" />
  </NavMenuItem>
  <NavMenuItem
    on:click={() => ($currentTab = 'accessibility')}
    role="menuitem"
    tabindex="0"
    class="menu-item"
  >
    <Translation key="nav:setting-accessibility" />
  </NavMenuItem>
</NavMenuGroup>

<NavMenuGroup labelKey="nav:group-links">
  <NavMenuItemLink
    href="https://docs.google.com/forms/d/e/1FAIpQLScyHHUYzdFsL4HxhElhmj70_JNhTtfxiZM-KcbsYVBA_YfSvA/viewform?usp=send_form"
  >
    <Translation key="nav:external-submit-play" />
  </NavMenuItemLink>

  <NavMenuItemLink
    href="https://docs.google.com/forms/d/e/1FAIpQLSfhDCiKdZTkD_A6RFeei3eGZFdNTb8yClfBZgJ7um8veKV5aQ/viewform"
  >
    <Translation key="nav:external-submit-level" />
  </NavMenuItemLink>

  <NavMenuItemLink
    href="https://docs.google.com/forms/d/e/1FAIpQLSff8C5U7_aXwwO56uvnZMvLoA6P3iY8YRAg2J2UVAusHOkM2Q/viewform?usp=sf_link"
  >
    <Translation key="nav:external-re-level" />
  </NavMenuItemLink>
</NavMenuGroup>

<div class="mobile-only">
  <NavMenuGroup labelKey="nav:group-pages">
    <NavMenuItemLink href="/levels">
      <Translation key="nav:levels" />
    </NavMenuItemLink>

    <NavMenuItemLink href="/rankings">
      <Translation key="nav:rankings" />
    </NavMenuItemLink>

    <NavMenuItemLink href="/references">
      <Translation key="nav:references" />
    </NavMenuItemLink>
  </NavMenuGroup>
</div>

{#if useAccount}
  <!-- <div class="menu__divider" /> -->

  <!-- TODO -->
  <NavSignArea overlay />
{/if}
