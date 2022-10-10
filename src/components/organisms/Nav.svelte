<script lang="ts">
  import Logo from '../atoms/NavLogo.svelte';
  import NavLinks from '../molecules/NavLinks.svelte';
  import NavSignArea from '../molecules/NavSignArea.svelte';
  import Icon from '../atoms/Icon.svelte';
  import NavMenuOverlay from './NavMenuOverlay.svelte';
  import Popover from '../atoms/Popover.svelte';
</script>

<nav class="fixed w-full z-[100] left-0 top-0 bg-opacity-25 bg-black backdrop-blur-sm">
  <div class="h-nav  flex items-center px-[24px] relative gap-[16px]">
    <Logo />
    <div class="absolute left-1/2 -translate-x-1/2 hidden md:block">
      <NavLinks />
    </div>
    <div class="flex-grow" />

    {#if import.meta.env.VITE_USE_ACCOUNT}
      <div class="hidden md:block">
        <NavSignArea />
      </div>
      <div class="bg-white opacity-40 w-[1px] h-[18px] hidden md:block" />
    {/if}

    <Popover options={{ maxWidth: '100vw' }} placement="bottom-end">
      <span slot="button" class="opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
        <Icon icon="expand" size={16} />
      </span>
      <NavMenuOverlay />
    </Popover>
  </div>
</nav>
