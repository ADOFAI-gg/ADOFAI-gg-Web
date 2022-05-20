<script lang="ts">
  import { navigating } from '$app/stores';
  import LoadingSpinner from '@/components/atoms/LoadingSpinner.svelte';
  import { fade } from 'svelte/transition';
</script>

{#if $navigating}
  <div class="fixed right-[10px] top-[10px] z-[1000]" transition:fade>
    <LoadingSpinner filled size={36} />
  </div>
{/if}
