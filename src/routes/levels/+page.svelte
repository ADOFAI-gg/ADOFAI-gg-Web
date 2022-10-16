<script lang="ts">
  import LevelList from '@templates/LevelList.svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    const contentWrapper = document.querySelector('.simplebar-content-wrapper');

    setTimeout(() => {
      contentWrapper?.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  });
</script>

<LevelList />
