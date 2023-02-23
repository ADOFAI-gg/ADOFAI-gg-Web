<script lang="ts">
  import Logo from '@atoms/nav/NavLogo.svelte';
  import NavLinks from '@molecules/nav/NavLinks.svelte';
  import NavSignArea from '@molecules/nav/NavSignArea.svelte';
  import Icon from '@atoms/asset/Icon.svelte';
  import NavMenuOverlay from '@organisms/layout/NavMenuOverlay.svelte';
  import Popover from '@atoms/common/Popover.svelte';
</script>

<nav>
  <Logo />

  <div class="links">
    <NavLinks />
  </div>

  <div style="flex-grow: 1;" />

  {#if import.meta.env.VITE_USE_ACCOUNT}
    <div class=" sign-area">
      <NavSignArea />
    </div>

    <div class="division-line" />
  {/if}

  <Popover options={{ maxWidth: '100vw' }} placement="bottom-end">
    <span slot="button" class="expand-icon">
      <Icon icon="expand" size={16} alt="Expand icon" />
    </span>

    <NavMenuOverlay />
  </Popover>
</nav>

<style lang="scss">
  nav {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    gap: 16px;
    align-items: center;
    width: 100%;
    height: var(--nav-height);
    padding: 0 24px;
    background-color: rgba(var(--color-darkblue), 0.5);
    backdrop-filter: blur(4px);

    .links {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    .division-line {
      width: 1px;
      height: 18px;
      background-color: rgba(255, 255, 255, 0.4);
    }

    .expand-icon {
      opacity: 0.8;
      cursor: pointer;
      transition: opacity 0.2s ease-in-out;

      &:hover,
      &:focus {
        opacity: 1;
      }
    }

    .links,
    .sign-area,
    .division-line {
      display: none;

      @media (min-width: 768px) {
        display: block;
      }
    }
  }
</style>
