<script lang="ts">
  import HomeLogo from '@molecules/home/HomeLogo.svelte';
  import SearchInput from '@molecules/search/SearchInput.svelte';
  import { goto } from '$app/navigation';
  import { searchSettingStore } from '@/stores/search';

  let searchQuery: string;

  const onSubmitSearch = (e: Event) => {
    e.preventDefault();
    searchSettingStore.update((v) => ({
      ...v,
      query: searchQuery
    }));
    goto('/levels');
  };

  // export let syncStatus: SyncStatusResponse;
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
