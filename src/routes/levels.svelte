<script context="module" lang="ts">
  export const load: Load = async () => {
    return {
      stuff: {
        title: 'Levels - ADOFAI.gg'
      }
    };
  };
</script>

<script lang="ts">
  import LevelList from '@/components/templates/LevelList.svelte';
  import type { Load } from '@sveltejs/kit';
</script>

<LevelList />
