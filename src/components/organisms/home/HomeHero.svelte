<script lang="ts">
  import HomeLogo from '@molecules/home/HomeLogo.svelte';
  import SearchInput from '@molecules/search/SearchInput.svelte';
  // TODO fix navigation
  // import { goto } from '$app/navigation';
  import { searchSetingStore } from '@/stores/search';

  let searchQuery: string;

  const onSubmitSearch = (e: Event) => {
    e.preventDefault();
    searchSetingStore.update((v) => ({
      ...v,
      query: {
        ...v.query,
        full: true,
        title: searchQuery
      }
    }));
    // goto('/levels');
  };
</script>

<div class="hero">
  <HomeLogo />

  <form class="hero__form" on:submit={onSubmitSearch}>
    <SearchInput bind:value={searchQuery} />
  </form>
</div>

<style lang="scss">
  .hero {
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: center;
    max-width: 700px;
    margin-top: 60px;
    margin-right: auto;
    margin-left: auto;
    padding: 0 16px;

    &__form {
      width: 100%;
    }
  }
</style>
