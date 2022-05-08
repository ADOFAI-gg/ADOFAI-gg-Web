<script lang="ts">
  import HomeLogo from '../molecules/HomeLogo.svelte';
  import SearchInput from '../molecules/SearchInput.svelte';
  import { goto } from '$app/navigation';

  let searchQuery: string;

  const onSubmitSearch = (e: Event) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.append('query', searchQuery);
    goto(`/levels?${params}`);
  };
</script>

<div class="px-4 max-w-[700px] mt-[60px] mx-auto flex flex-col items-center gap-[50px]">
  <HomeLogo />
  <form on:submit={onSubmitSearch} class="w-full">
    <SearchInput bind:value={searchQuery} />
  </form>
</div>
