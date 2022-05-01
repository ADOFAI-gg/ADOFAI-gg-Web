<script lang="ts">
  import Logo from '../atoms/NavLogo.svelte';
  import NavLinks from '../molecules/NavLinks.svelte';
  import NavSignArea from '../molecules/NavSignArea.svelte';
</script>

<nav class="h-[56px] bg-black bg-opacity-25 flex items-center px-[24px] relative">
  <Logo />
  <div class="absolute left-1/2 -translate-x-1/2">
    <NavLinks />
  </div>
  <div class="flex-grow" />
  <NavSignArea />
</nav>
