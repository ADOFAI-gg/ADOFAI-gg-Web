<script lang="ts">
  import Logo from '@atoms/nav/NavLogo.svelte';
  import NavLinks from '@molecules/nav/NavLinks.svelte';
  import NavSignArea from '@molecules/nav/NavSignArea.svelte';
  import Icon from '@atoms/asset/Icon.svelte';
  import NavMenuOverlay from '@organisms/layout/NavMenuOverlay.svelte';
  import Popover from '@atoms/common/Popover.svelte';
</script>

<div class="nav-container">
  <nav class="nav">
    <Logo />

    <div class="nav__links">
      <NavLinks />
    </div>

    <div style="flex-grow: 1;" />

    {#if import.meta.env.VITE_USE_ACCOUNT}
      <div class="nav__sign-area">
        <NavSignArea />
      </div>

      <div class="nav__divider" />
    {/if}
    <Popover
      style="--tippy-corner-radius: 12px;"
      options={{ maxWidth: '100vw', offset: [0, 30], arrow: false }}
      placement="bottom-end"
    >
      <span slot="button" class="nav__expand-icon">
        <Icon icon="expand" size={16} alt="Expand icon" />
      </span>

      <NavMenuOverlay />
    </Popover>
  </nav>
</div>

<style lang="scss">
  .nav-container {
    position: sticky;
    top: 0;
    z-index: 999999;
  }

  .nav {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    gap: 16px;
    align-items: center;
    width: 100%;
    height: var(--nav-height);
    padding: 0 24px;
    background-color: rgba(var(--color-darkblue), 0.5);
    backdrop-filter: blur(4px);

    &__links {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    &__divider {
      width: 1px;
      height: 18px;
      background-color: rgba(255, 255, 255, 0.4);
    }

    &__expand-icon {
      opacity: 0.8;
      cursor: pointer;
      transition: opacity 0.2s ease-in-out;

      &:hover,
      &:focus {
        opacity: 1;
      }
    }

    &__links,
    &__sign-area,
    &__divider {
      display: none;

      @media (min-width: 768px) {
        display: block;
      }
    }
  }
</style>
