<script lang="ts">
  import NavSignArea from '../molecules/NavSignArea.svelte';
  import NavLinks from '../molecules/NavLinks.svelte';
</script>

<div class="w-[240px] p-4">
  <div class="md:hidden flex flex-col gap-4">
    <NavLinks />
    <div class="bg-white bg-opacity-20 w-full h-[1px]" />
    <NavSignArea />
  </div>
</div>
