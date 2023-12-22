<script lang="ts">
  import NavLink from '@atoms/nav/NavLink.svelte';
  import Translation from '@/components/utils/Translation.svelte';
</script>

<div class="nav-link">
  <NavLink to="/levels">
    <Translation key="nav:levels" />
  </NavLink>

  <NavLink to="/rankings">
    <Translation key="nav:rankings" />
  </NavLink>

  <NavLink to="/references">
    <Translation key="nav:references" />
  </NavLink>
</div>

<style lang="scss">
  .nav-link {
    display: flex;

    @media (width >= 768px) {
      gap: 40px;
    }
  }
</style>
