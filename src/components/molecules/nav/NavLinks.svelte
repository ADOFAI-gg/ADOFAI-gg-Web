<script lang="ts">
  import NavLink from '@atoms/nav/NavLink.svelte';
  import Translation from '@/components/utils/Translation.svelte';
</script>

<div class="flex md:gap-[40px]">
  <NavLink to="/levels">
    <Translation key="NAV_LEVELS" />
  </NavLink>

  <NavLink to="/rankings">
    <Translation key="NAV_RANKINGS" />
  </NavLink>

  <NavLink to="/references">
    <Translation key="NAV_REFERENCES" />
  </NavLink>
</div>
