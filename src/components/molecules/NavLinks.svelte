<script lang="ts">
  import NavLink from '../atoms/NavLink.svelte';
  import Translation from '../utils/Translation.svelte';
</script>

<div class="flex md:gap-[40px]">
  <NavLink to="/levels">
    <Translation key="NAV_LEVELS" />
  </NavLink>
  <NavLink to="/rankings">
    <Translation key="NAV_RANKINGS" />
  </NavLink>
</div>
