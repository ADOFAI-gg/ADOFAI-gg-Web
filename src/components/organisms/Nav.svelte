<script lang="ts">
  import Logo from '../atoms/NavLogo.svelte';
  import NavLinks from '../molecules/NavLinks.svelte';
  import NavSignArea from '../molecules/NavSignArea.svelte';
  import Icon from '../atoms/Icon.svelte';
  import Expand from '@/assets/icons/expand.svg?url';
  import NavMenuOverlay from './NavMenuOverlay.svelte';

  let menuOpen = false;

  const toggleMenu = () => {
    menuOpen = !menuOpen;
  };
</script>

<nav class="fixed w-full z-[100] left-0 top-0">
  <div class="h-nav bg-black bg-opacity-25 flex items-center px-[24px] relative gap-[16px]">
    <Logo />
    <div class="absolute left-1/2 -translate-x-1/2 hidden md:block">
      <NavLinks />
    </div>
    <div class="flex-grow" />
    <div class="hidden md:block">
      <NavSignArea />
    </div>
    <div class="bg-white opacity-40 w-[1px] h-[18px] hidden md:block" />
    <span
      class="opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
      on:click={toggleMenu}
    >
      <Icon icon={Expand} size={16} />
    </span>
    <NavMenuOverlay open={menuOpen} on:close={toggleMenu} />
  </div>
</nav>
