<script lang="ts">
  import HomeLogo from '@molecules/home/HomeLogo.svelte';
  import SearchInput from '@molecules/SearchInput.svelte';
  import { goto } from '$app/navigation';
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
    goto('/levels');
  };
</script>

<div class="px-4 max-w-[700px] mt-[60px] mx-auto flex flex-col items-center gap-[32px]">
  <HomeLogo />

  <form on:submit={onSubmitSearch} class="w-full">
    <SearchInput bind:value={searchQuery} />
  </form>
</div>
